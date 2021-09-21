import libpath from "path";
import Pug from "pug";

export async function renderView(path: string, context?: any): Promise<string> {
  const truePath = libpath.join(__dirname, "../../views/", path);
  return Pug.renderFile(truePath, context);
}
