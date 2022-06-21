import { join, resolve } from "node:path";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import * as handlebars from "handlebars";
import { Iconfont, IconfontConfig } from "./projectType";

function getTemplate(iconfontConfig: IconfontConfig) {
  let content;
  if (iconfontConfig.is_vue2) {
    if (iconfontConfig.use_typescript) {
      throw Error("not support typescript");
    } else {
      const fileName = join(__dirname, "../vue-template/ColorsIcon.handlebars");
      content = readFileSync(fileName).toString();
    }
  } else {
    throw Error("not support vue3");
  }
  return handlebars.compile(content);
}

export default function generateIconfontFile(icons: Iconfont[], iconfontConfig: IconfontConfig) {
  const template = getTemplate(iconfontConfig);
  const content = template({
    size: iconfontConfig.default_icon_size,
    unit: iconfontConfig.unit,
    icons,
  });
  mkdirSync(resolve(iconfontConfig.save_dir), { recursive: true });
  writeFileSync(`${iconfontConfig.save_dir}/ColorsIcon.vue`, content);
}
