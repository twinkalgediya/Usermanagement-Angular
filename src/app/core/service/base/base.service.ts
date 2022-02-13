import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
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

  private getAccessToken(is_admin: boolean = false): string {
    let token;
    if (is_admin) {
      token = localStorage.getItem("admintoken");
    } else {
      token = localStorage.getItem("token");
    }

    return "Bearer " + token;
  }

  private getHeaders(
    authorizationHeader: boolean = true,
    is_admin: boolean = false
  ): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("accept", "application/json");
    headers = headers.append("Content-Type", "application/json");
    if (authorizationHeader) {
      headers = headers.append("Authorization", this.getAccessToken(is_admin));
    }
    return headers;
  }

  get(
    url: string,
    requestParamModel?: any,
    authorizationHeader: boolean = true,
    is_admin: boolean = false
  ) {
    const fullURL = this.getURL(url, requestParamModel);
    const headers = this.getHeaders(authorizationHeader, is_admin);
    return this.http.get(fullURL, {
      headers: headers,
      observe: "response",
    });
  }

  post(
    url: string,
    bodyModel: any,
    isAuthorized: boolean = true,
    is_admin: boolean = false
  ) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders(isAuthorized, is_admin);
    return this.http.post(fullURL, bodyModel, {
      headers: headers,
    });
  }

  uploadPut(url: string, bodyModel: FormData, is_admin: boolean = false) {
    const fullURL = this.getURL(url);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", this.getAccessToken(is_admin));
    return this.http.put(fullURL, bodyModel, {
      headers: headers,
    });
  }

  uploadPost(
    url: string,
    bodyModel: FormData,
    authorizationHeader: boolean = true,
    is_admin: boolean = false
  ) {
    const fullURL = this.getURL(url);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", this.getAccessToken(is_admin));
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

  delete(url: string, isAuthorized: boolean = true, is_admin: boolean = false) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders(isAuthorized, is_admin);
    return this.http.delete(fullURL, {
      headers: headers,
    });
  }
}
