import { request, APIRequestContext } from '@playwright/test';

export class ApiClient {
  private context!: APIRequestContext;

  async init(token?: string) {
    this.context = await request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }

  get(url: string) {
    return this.context.get(url);
  }

  post(url: string, body: any) {
    return this.context.post(url, { data: body });
  }

  put(url: string, body: any) {
    return this.context.put(url, { data: body });
  }

  delete(url: string) {
    return this.context.delete(url);
  }
}
