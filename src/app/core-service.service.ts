import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constantData } from './constantData';

@Injectable({
  providedIn: 'root'
})
export class CoreServiceService {

  constructor(private http: HttpClient, private cnstData: constantData) { }

  get(url: string) {
    return this.http.get<any[]>(url, {
      headers: {
        'Content-Type': 'application/json',
      }, observe: 'response'
    });
  }

  getByYear(year: string, launch: string | boolean, land: string | boolean) {
    let homeUrl = `${this.cnstData.configUrl}`;

    if (year) {
      homeUrl = homeUrl + `&launch_year=${year}`;
    }

    //if launch filter is applicable
    if (launch) {
      launch === true ? true : false;
      homeUrl = homeUrl + `&launch_success=${launch}`;
    }

    // if landing filter is applicable
    if (land) {
      land === true ? true : false;
      homeUrl = homeUrl + `&land_success=${land}`;
    }

    return this.http.get<any[]>(homeUrl, {
      headers: {
        'Content-Type': 'application/json',
      }, observe: 'response'
    });
  }
}
