#!/usr/bin/env node

import { join, resolve } from "node:path";
import { existsSync } from "node:fs";
import { copySync } from "fs-extra";
import { errorLog, successLog } from "../libs/util";

const targetFile = resolve("iconfont.json");

if (existsSync(targetFile)) {
  errorLog('File "iconfont.json" was created before.');
} else {
  copySync(join(__dirname, "../config-template/iconfont.json"), targetFile);
  successLog('File "iconfont.json" is created now. We recommend you add it to version control.');
}
