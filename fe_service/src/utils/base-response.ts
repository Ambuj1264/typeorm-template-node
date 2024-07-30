import { Request, Response } from "express";

export class BaseResponse {
  constructor(req: Request, res: Response) {
    this._res = res;
  }

  public success: boolean = true;
  public data: any = null;
  public stackTrace: string;
  public message: string;
  private _res: Response;

  //   public send() {
  //     //const nStatus: number = this.errors.length ? 500 : 200;
  //     const nStatus = 200;
  //     this._res.status(nStatus).json({
  //       data: this.data,
  //       message: this.message,
  //       stackTrace: this.stackTrace,
  //     });
  //   }
  // }
  public send() {
    const response = this.data;
    const nStatus = 200;
    this._res.status(nStatus).json(response);
  }
}
