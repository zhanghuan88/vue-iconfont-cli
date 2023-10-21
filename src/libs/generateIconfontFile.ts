import { join, resolve } from "node:path";
import R from "ramda";
import { mkdirSync, writeFileSync } from "fs";
import * as handlebars from "handlebars";
import { Iconfont, IconfontConfig } from "./projectType";
import { getFileContent } from "./util";

function getTemplate(iconfontConfig: IconfontConfig) {
  let url: string;
  if (iconfontConfig.is_vue2) {
    if (iconfontConfig.use_typescript) {
      url = "../vue-template/vue2_typescript.handlebars";
    } else {
      url = "../vue-template/vue2.handlebars";
    }
  } else if (iconfontConfig.use_typescript) {
    throw Error("not support vue3 typescript");
  } else {
    url = "../vue-template/vue3.handlebars";
  }
  return R.pipe(
    R.useWith<string, string, string, string, string>(join, [R.identity, R.identity]),
    getFileContent,
    handlebars.compile
  )(__dirname, url);
}

export default function generateIconfontFile(icons: Iconfont[], iconfontConfig: IconfontConfig) {
  if (R.isEmpty(icons)) return;
  const template = getTemplate(iconfontConfig);
  const content = template({
    size: iconfontConfig.default_icon_size,
    unit: iconfontConfig.unit,
    icons,
  });
  mkdirSync(resolve(iconfontConfig.save_dir), { recursive: true });
  writeFileSync(`${iconfontConfig.save_dir}/ColorsIcon.vue`, content);
}
