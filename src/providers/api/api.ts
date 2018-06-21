import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://api.edamam.com/api/nutrition-data?app_id=7dbe9972&app_key=\n' +
    '868bb09c2ca0acdd9ca9c44a6fdb5a92';

  constructor(public http: HttpClient) {
  }

  get(ingredients, serving) {
    return new Promise(resolve => {
      this.http.get(this.url + '&ingr=' + ingredients + '&serving=' + serving).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
