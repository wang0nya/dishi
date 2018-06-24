import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  // url: string = 'https://api.edamam.com/api/nutrition-data?app_id=7dbe9972&app_key=\n' +
  //   '868bb09c2ca0acdd9ca9c44a6fdb5a92';

  constructor(public http: HttpClient, private cache: CacheService) {
  }

  get(ingredients, serving) {
    return new Promise(resolve => {
      let url = `https://api.edamam.com/api/nutrition-data?app_id=7dbe9972&app_key=868bb09c2ca0acdd9ca9c44a6fdb5a92&ingr=${ingredients}&serving=${serving}`;
      let cacheKey = url;
      let request = this.http.get(url);
      return this.cache.loadFromObservable(cacheKey, request).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  //
  // post(endpoint: string, body: any, reqOpts?: any) {
  //   return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  // }
  //
  // put(endpoint: string, body: any, reqOpts?: any) {
  //   return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  // }
  //
  // delete(endpoint: string, reqOpts?: any) {
  //   return this.http.delete(this.url + '/' + endpoint, reqOpts);
  // }
  //
  // patch(endpoint: string, body: any, reqOpts?: any) {
  //   return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  // }
}
