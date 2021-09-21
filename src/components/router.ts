import Koa from "koa";
import koaBody from "koa-body";
import KoaRouter from "koa-router";
import KoaStatic from "koa-static";
import KoaMount from "koa-mount";
import * as Boom from "@hapi/boom";
import path from "path";
import { User } from "@prisma/client";
import { captureException, PublicError } from "./sentry";
import { renderView } from "./views";

export interface KoaState extends Koa.DefaultState {
  user?: User;

  // Whether loading the user has been attempted
  userLoaded?: boolean;
}

export interface KoaContext extends Koa.Context {
  state: KoaState;
  render: typeof renderView;
}

export const koa = new Koa<KoaState, KoaContext>();
export const router = new KoaRouter<KoaState, KoaContext>({
  prefix: process.env.HTTP_URL_PREFIX,
});

koa.use(
  koaBody({
    text: false,
    multipart: true,
    urlencoded: true,
    formidable: {
      keepExtensions: true,
    },
  })
);
koa.use(KoaMount("/", KoaStatic(path.join(__dirname, "../../static"))));

// Error catcher
koa.use(async (ctx, next) => {
  ctx.set("X-Powered-By", "Coffee");

  try {
    await next();

    // Handle non-200 HTTP replies
    if (ctx.status < 200 || ctx.status > 299) {
      ctx.render("errors/error.pug", {
        error: ctx.response.message,
        status: ctx.status,
        statusCode: ctx.status,
      });
    }
  } catch (e: unknown) {
    captureException(e, {});

    if (!Boom.isBoom(e) && !(e instanceof PublicError)) {
      console.error(e);
      e = Boom.internal();
      await outputError(ctx, e);
    } else if (e instanceof PublicError) {
      e = Boom.badRequest(e.message, e);
      await outputError(ctx, e);
    }
  }
});

async function outputError(
  ctx: Koa.ParameterizedContext<KoaState, KoaContext, any>,
  e: any
) {
  ctx.status = e.output.statusCode;
  ctx.render("errors/error.pug", {
    ...e.output.payload,
    status: ctx.status,
    statusCode: undefined,
  });
}

// Render utility
koa.use(async (ctx, next) => {
  ctx.render = async (path: string, context?: any) => {
    ctx.body = await renderView(path, {
      ...context,
      user: ctx.state.user,
    });
    return ctx.body;
  };

  await next();
});

koa.use(router.routes());
koa.use(router.allowedMethods());
