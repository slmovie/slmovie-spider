export interface IStatus {
  code: number;
  error: string;
}

export class StatusBean implements IStatus {
  static SUCCESS = 1;
  static FAILED = 0;
  static FAILED_NEED_REPEAT = -1;
  static SUCCESS_EMPTY = 2;

  code = StatusBean.FAILED;
  error = ""
}