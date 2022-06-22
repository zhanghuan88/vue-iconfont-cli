import { existsSync } from "node:fs";
import { replace, test } from "ramda";
import { readJSONSync } from "fs-extra";
import defaultIconFont from "../config-template/iconfont.json";
import { IconfontConfig } from "./projectType";

// @ts-ignore
const checkSymbolUrl: (str?: string) => boolean = test(/^(https?:)?\/\//);

let cacheIconFontConfig: IconfontConfig;

export default (path: string): IconfontConfig => {
  if (cacheIconFontConfig) return cacheIconFontConfig;
  // 校验文件是否存在
  if (!existsSync(path)) {
    throw Error(`iconfont.json is not exists`);
  }
  // 读取文件
  const config = readJSONSync(path) as Partial<IconfontConfig>;
  // 校验文件是否合法
  if (!checkSymbolUrl(config.symbol_url)) {
    throw Error(`symbol_url is not valid`);
  }
  return {
    symbol_url: replace(/^(https?:)?\/\//, "https://", config.symbol_url as string),
    use_typescript: config.use_typescript ?? defaultIconFont.use_typescript,
    local_icon_dir: config.local_icon_dir ?? defaultIconFont.local_icon_dir,
    save_dir: config.save_dir ?? defaultIconFont.save_dir,
    trim_icon_prefix: config.trim_icon_prefix ?? defaultIconFont.trim_icon_prefix,
    unit: config.unit ?? defaultIconFont.unit,
    default_icon_size: config.default_icon_size ?? defaultIconFont.default_icon_size,
    is_vue2: config.is_vue2 ?? defaultIconFont.is_vue2,
  };
};
