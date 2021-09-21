import { router } from "../components/router";
import { Middleware } from "./_middleware";

export function init() {
  router.get("/", async (ctx) => {
    ctx.render("index.pug", {
      title: "Home | Verbose Guacamole",
      heroClass: true,
    });
  });

  router.get("/about", async (ctx) => {
    ctx.render("about.pug", {
      title: "About | Verbose Guacamole",
    });
  });

  router.get("/terms", async (ctx) => {
    ctx.render("terms.pug", { title: "Terms of Service | Verbose Guacamole" });
  });

  router.get("/privacy", async (ctx) => {
    ctx.render("privacy.pug", { title: "Privacy Policy | Verbose Guacamole" });
  });
}
