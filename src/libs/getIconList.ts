import to from "await-to-js";
import axios from "axios";
import R from "ramda";
import * as cheerio from "cheerio";
import camelCase from "camelcase";
import { CheerioAPI, Element } from "cheerio";
import { Iconfont, IconfontChild, IconfontConfig } from "./projectType";
import { filterPathIsEmpty, getPathEmptyOr } from "./util";

export default async function getIconListByUrl(config: IconfontConfig): Promise<Iconfont[]> {
  const [, res] = await to(axios.get<string>(config.symbol_url));
  if (res) {
    // 初始化 cheerio
    const $: CheerioAPI = R.pipe(R.match(/<svg[\s\S]*?>([\s\S]*?)<\/svg>/g), R.head, cheerio.load)(res.data);

    const children: Element[] = Array.from($("svg").children());
    // 获取图标名称
    const getIconName: (element: Element) => string = R.pipe(
      R.pathOr("", ["attribs", "id"]),
      R.replace(new RegExp(`^${config.trim_icon_prefix}`), ""),
      camelCase
    );
    // 获取图标的属性
    const getViewBox: (element: Element) => string = R.pipe(getPathEmptyOr("0 0 1024 1024", ["attribs", "viewBox"]));

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
    // @ts-ignore
    const getIconList: (ele: Element[]) => Iconfont[] = R.into(
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
    return getIconList(children);
  }
  throw Error("get iconfont request failed");
}
