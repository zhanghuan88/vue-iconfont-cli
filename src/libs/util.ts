import chalk from "chalk";
import R, { Path } from "ramda";

export function successLog(msg: string) {
  console.log(chalk.green(msg));
}

export function errorLog(msg: string) {
  console.error(chalk.red(msg));
}

// 生成过滤掉某属性为空的方法
export const filterPathIsEmpty = (path: Path) => R.filter(R.pipe(R.path<string>(path), R.complement(R.isEmpty)));
