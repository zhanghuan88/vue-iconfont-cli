import chalk from "chalk";
import R, { Path } from "ramda";
import { readFileSync } from "fs";

export function successLog(msg: string) {
  console.log(chalk.green(msg));
}

export function errorLog(msg: string) {
  console.error(chalk.red(msg));
}

// null undefined 当前类型空值返回true
export const isEmpty = R.either(R.isNil, R.isEmpty);
// 返回 过滤掉某属性为空的函数
export const filterPathIsEmpty = (path: Path) => R.filter(R.pipe(R.path(path), R.complement(isEmpty)));
// 返回 获取路径上的值,为空返回默认值函数
export const getPathEmptyOr: <T>(defaultValue: T, path: Path) => (args: any) => T = <T>(defaultValue: T, path: Path) =>
  R.pipe(R.path<T>(path), R.when<any, T>(isEmpty, R.always(defaultValue)));
export const getFileContent: (url: string) => string = R.pipe(readFileSync, R.invoker(0, "toString"));
