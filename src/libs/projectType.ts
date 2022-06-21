export type IconfontConfig = {
  symbol_url: string;
  use_typescript: boolean;
  is_vue2: boolean;
  save_dir: string;
  trim_icon_prefix: string;
  unit: string;
  default_icon_size: number;
};
export type IconfontChild = {
  d: string;
  fill: string;
};
export type Iconfont = {
  name: string;
  viewBox: string;
  child: IconfontChild[];
};
