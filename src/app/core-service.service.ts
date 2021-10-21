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

    if (launch) {
      const launches = launch === true ? true : false;
      homeUrl = homeUrl + `&launch_success=${launches}`;
    }

    if (land) {
      const landed = land === true ? true : false;
      homeUrl = homeUrl + `&land_success=${landed}`;
    }
    // debugger
    return this.http.get<any[]>(homeUrl, {
      headers: {
        'Content-Type': 'application/json',
      }, observe: 'response'
    });
  }
}
