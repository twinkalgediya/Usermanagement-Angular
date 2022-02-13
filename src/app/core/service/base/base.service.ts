import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private http: HttpClient) {}
  private readonly API_URL: string = environment.apiUrl;

  private getURL(url: string, requestParamModel?: any): string {
    let newURL: string = this.API_URL + url;
    if (requestParamModel) {
      newURL += requestParamModel.getParams();
    }
    return newURL;
  }

  private getAccessToken(): string {
    const token = localStorage.getItem('token');
    return 'Bearer ' + token;
  }

  private getHeaders(authorizationHeader: boolean = true): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    if (authorizationHeader) {
      headers = headers.append('Authorization', this.getAccessToken());
    }
    return headers;
  }

  get(url: string, requestParamModel?: any) {
    const fullURL = this.getURL(url, requestParamModel);
    const headers = this.getHeaders();
    return this.http.get(fullURL, {
      headers: headers,
      observe: 'response',
    });
  }

  post(url: string, bodyModel: any,isAuthorized:boolean = true) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders(isAuthorized);
    return this.http.post(fullURL, bodyModel, {
      headers: headers,
    });
  }


  uploadPut(url: string, bodyModel: FormData) {
    const fullURL = this.getURL(url);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.getAccessToken());
    return this.http.put(fullURL, bodyModel, {
      headers: headers,
    });
  }

  uploadPost(url: string, bodyModel: FormData) {
    const fullURL = this.getURL(url);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.getAccessToken());
    return this.http.post(fullURL, bodyModel, {
      headers: headers,
    });
  }

  postWithoutToken(url: string, bodyModel: any) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders(false);
    return this.http.post(fullURL, bodyModel, {
      headers: headers,
    });
  }

  put(url: string, bodyModel: any) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders();
    return this.http.put(fullURL, bodyModel, {
      headers: headers,
    });
  }

  delete(url: string) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders();
    return this.http.delete(fullURL, {
      headers: headers,
    });
  }
}
