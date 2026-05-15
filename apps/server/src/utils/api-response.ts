export type ApiMeta = Record<string, unknown>;

export class ApiResponse<TData> {
  public readonly success: boolean;

  constructor(
    public readonly statusCode: number,
    public readonly data: TData,
    public readonly message = "Success",
    public readonly meta?: ApiMeta,
  ) {
    this.success = statusCode < 400;
  }
}
