import { resolve } from "node:path";
import getIconfontConfig from "../libs/getIconfontConfig";
import { errorLog, warnLog } from "../libs/util";
import getIconList from "../libs/getIconList";
import generateIconfontFile from "../libs/generateIconfontFile";

const generateIconfont = async () => {
  const iconfontConfig = getIconfontConfig(resolve("iconfont.json"));
  const icons = await getIconList(iconfontConfig);
  if (icons.length === 0) {
    warnLog("icons is empty");
  }
  generateIconfontFile(icons, iconfontConfig);
};
generateIconfont()
  .then()
  .catch((e) => {
    errorLog((e as Error).message ?? "unknown error");
  });
