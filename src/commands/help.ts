#!/usr/bin/env node
import chalk from "chalk";

console.log(
  [
    "",
    "Usage:",
    `       ${chalk.yellow("npx iconfont-init")}       : generate config file`,
    `       ${chalk.yellow("npx iconfont-h5")}         : generate icon components`,
    "",
  ].join("\n")
);
