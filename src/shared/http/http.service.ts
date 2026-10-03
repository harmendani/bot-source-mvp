import type { HttpMethods, HttpRequest } from './http.interface.js';

const HTTP_TIMEOUT_MS = 10000;

export class HttpService implements HttpMethods {
  private request = async (method: string, { url, headers, body }: HttpRequest): Promise<unknown> => {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...headers },
      body: body instanceof URLSearchParams || body === undefined ? body : JSON.stringify(body),
      signal: AbortSignal.timeout(HTTP_TIMEOUT_MS),
    });

    if (!response.ok) throw response;

    const text = await response.text();
    return text ? JSON.parse(text) : undefined;
  };

  get = (request: HttpRequest) => this.request('GET', request);
  post = (request: HttpRequest) => this.request('POST', request);
  put = (request: HttpRequest) => this.request('PUT', request);
  del = (request: HttpRequest) => this.request('DELETE', request);
  patch = (request: HttpRequest) => this.request('PATCH', request);
}
