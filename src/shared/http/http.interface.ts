export type HttpRequest = {
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
}

export interface HttpMethods {
  get: (request: HttpRequest) => Promise<unknown>;
  post: (request: HttpRequest) => Promise<unknown>;
  put: (request: HttpRequest) => Promise<unknown>;
  del: (request: HttpRequest) => Promise<unknown>;
  patch: (request: HttpRequest) => Promise<unknown>;
}
