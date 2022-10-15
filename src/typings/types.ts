export interface userFrom {
  username: string;
  password: any;
  code?: number;
}

export interface userInfo {
  username: string;
  avatar: string;
  id: string;
}

export interface muenFace {
  item: any;
  key: string;
  keyPath: string;
}
export interface fliterOptions {
  data?: any[];
  valueKey: string;
  labelKey?: string;
}

export interface filterItem {
  label: string;
  key: string;
  type?: string;
  multiple?: boolean;
  [propName: string]: any;
}
