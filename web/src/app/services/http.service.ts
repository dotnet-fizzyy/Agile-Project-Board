import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
    constructor(private httpClient: HttpClient) {}

    public get = (url: string) => this.httpClient.get(url);

    public post = (url: string, body: any) => this.httpClient.post(url, body);
}
