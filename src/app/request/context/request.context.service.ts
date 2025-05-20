export class RequestContextService {
  private static requestId: string;

  static setRequestId(id: string) {
    this.requestId = id;
  }

  static getRequestId(): string {
    return this.requestId;
  }

  static clear() {
    this.requestId = undefined;
  }
}
