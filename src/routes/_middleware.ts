import { prisma } from "../components/prisma";
import { KoaContext } from "../components/router";
import Validator, {
  ValidationError,
  ValidationSchema,
} from "fastest-validator";
import { PublicError } from "../components/sentry";

const validator = new Validator();

export const Middleware = {
  /**
   * Validate parts of a request. TODO: Nice error messages
   */
  validate(schemas: { query?: ValidationSchema; body?: ValidationSchema }) {
    const checkBody = schemas.body && validator.compile(schemas.body);
    const checkQuery = schemas.query && validator.compile(schemas.query);

    return async (ctx: KoaContext, next: () => any) => {
      let res: ValidationError[];

      if (checkBody && true !== (res = checkBody(ctx.request.body) as any)) {
        ctx.status = 400;
        ctx.body = {
          error: {
            reason: "Request body failed validation.",
            details: "Check `errors` for additional information",
          },
          errors: res,
        };
        return;
      }

      if (checkQuery && true !== (res = checkQuery(ctx.request.body) as any)) {
        ctx.status = 400;
        ctx.body = {
          error: {
            reason: "Request query string failed validation.",
            details: "Check `errors` for additional information",
          },
          errors: res,
        };
        return;
      }

      return next();
    };
  },
};
