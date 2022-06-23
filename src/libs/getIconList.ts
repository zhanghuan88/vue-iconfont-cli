import to from "await-to-js";
import axios from "axios";
import R from "ramda";
import * as cheerio from "cheerio";
import { CheerioAPI, Element } from "cheerio";
import camelCase from "camelcase";
import { existsSync } from "node:fs";
import { join, parse, resolve } from "node:path";
import { Dirent, readdirSync, statSync } from "fs";
import { filterPathIsEmpty, getFileContent, getPathEmptyOr, warnLog } from "./util";
import { Iconfont, IconfontChild, IconfontConfig } from "./projectType";

// path Element数组转成IconfontChild数组
const mapIconfontChild = R.map(
  R.applySpec({
    d: R.path(["attribs", "d"]),
    fill: getPathEmptyOr("currentColor", ["attribs", "fill"]),
  })
);
// 获取图标的path数组
const getChildList: (ele: Element) => IconfontChild[] = R.pipe(
  R.pathOr([], ["children"]),
  R.into([], R.compose(filterPathIsEmpty(["attribs", "d"]), mapIconfontChild))
);
// 获取图标的属性
const getViewBox: (element: Element) => string = R.pipe(getPathEmptyOr("0 0 1024 1024", ["attribs", "viewBox"]));
// iconName根据trim_icon_prefix
const getNameFun = (trimIconPrefix: string) => R.pipe(R.replace(new RegExp(`^${trimIconPrefix}`), ""), camelCase);

// 获取目录下的所有文件
function getDirFile(dir: string): any[] {
  if (existsSync(dir) && statSync(dir).isDirectory()) {
    const files: Dirent[] = readdirSync(dir, { withFileTypes: true });
    return files.map((file) => {
      if (file.isFile()) {
        return join(dir, file.name);
      }
      if (file.isDirectory()) {
        return getDirFile(join(dir, file.name));
      }
      return [];
    });
  }
  return [];
}

// 获取svg文件部分内容
function getIconByFile(fileUrl: string): Pick<Iconfont, "viewBox" | "child"> {
  const svg = R.pipe(getFileContent, cheerio.load)(fileUrl)("svg");
  return {
    viewBox: getViewBox(svg[0]),
    child: getChildList(svg[0]),
  };
}

// 根据svg件获取icon
function dirIcons(config: IconfontConfig) {
  const localIcons: Iconfont[] = [];
  if (config.local_icon_dir === "") return localIcons;
  const fileUrls: string[] = R.pipe(resolve, getDirFile, R.flatten)(config.local_icon_dir);
  R.forEach((file) => {
    const fileInfo = parse(file);
    if (fileInfo.ext === ".svg") {
      const icon: Iconfont = R.mergeLeft(
        {
          name: fileInfo.name,
        },
        getIconByFile(file)
      );
      if (!R.isEmpty(icon.child)) {
        localIcons.push(icon);
      }
    }
  }, fileUrls);
  if (R.isEmpty(localIcons)) {
    warnLog("local_dir is empty!");
  }
  return localIcons;
}

// 获取url的icons
async function urlIcons(config: IconfontConfig) {
  const [, res] = await to(axios.get<string>(config.symbol_url));
  if (res) {
    // 初始化 cheerio
    const $: CheerioAPI = R.pipe(R.match(/<svg[\s\S]*?>([\s\S]*?)<\/svg>/g), R.head, cheerio.load)(res.data);

    const children: Element[] = Array.from($("svg").children());
    // 获取图标名称
    const getIconName: (element: Element) => string = R.pipe(
      R.pathOr("", ["attribs", "id"]),
      getNameFun(config.trim_icon_prefix)
    );
    // @ts-ignore
    const iconList: (ele: Element[]) => Iconfont[] = R.into(
      [],
      R.compose(
        R.map(
          R.applySpec({
            name: getIconName,
            viewBox: getViewBox,
            child: getChildList,
          })
        ),
        filterPathIsEmpty(["child"])
      )
    );
    return iconList(children);
  }
  warnLog("url is empty!");
  return [];
}

export default async function getIconList(config: IconfontConfig): Promise<Iconfont[]> {
  const icons = R.concat(dirIcons(config), await urlIcons(config));
  return R.uniqWith(R.eqBy(R.prop("name")), icons);
}
