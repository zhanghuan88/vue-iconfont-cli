import { resolve } from "node:path";
import getIconfontConfig from "../libs/getIconfontConfig";
import { errorLog } from "../libs/util";
import getIconListByUrl from "../libs/getIconList";
import generateIconfontFile from "../libs/generateIconfontFile";

const generateIconfont = async () => {
  const iconfontConfig = getIconfontConfig(resolve("iconfont.json"));
  const icons = await getIconListByUrl(iconfontConfig);
  generateIconfontFile(icons, iconfontConfig);
};
try {
  generateIconfont().then();
} catch (e) {
  errorLog((e as Error).message ?? "unknown error");
}
