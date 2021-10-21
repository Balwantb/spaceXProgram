import { Component, OnInit } from '@angular/core';
import { YEARS_VALUE, LAUNCH_VALUE, LANDING_VALUE, } from '../../src/app/constantData'
import { CoreServiceService } from './core-service.service';
import { constantData } from './constantData'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spaceXProgram';
  yearValues: any;
  allData: any[] | null = [];
  imagePath: any;
  fetchByYearURL = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014'
  selectedYear: any;
  selctedLaunchData: boolean | undefined;
  selctedLandingData: boolean | undefined;
  anotherData: any[] | null = [];
  land_successValue: any;
  cores: any;
  developerName = "Balwant Birajdar";
  launchValues: { text: string; value: boolean; }[] | undefined;
  landingValues: { text: string; value: boolean; }[] | undefined;

  constructor(private _CoreService: CoreServiceService, private constdata: constantData) { }

  ngOnInit() {
    this.getConstantValues();
    this.LoadData();
  }
  getConstantValues() {
    this.yearValues = YEARS_VALUE;
    this.launchValues = LAUNCH_VALUE;
    this.landingValues = LANDING_VALUE;
  }

  public LoadData() {
    this._CoreService.get(this.constdata.configUrl)
      .subscribe(mr => {
        this.allData = mr.body;
      });
  }

  clickOnYear() {
    this._CoreService.getByYear(this.selectedYear, this.selctedLaunchData!, this.selctedLandingData!)
      .subscribe(mr => {
        this.allData = mr.body;
        // console.log(this.allData);
      });
  }

  searchByYear(yearValue: any) {
    this.selectedYear = yearValue;
    this.clickOnYear();
  }

  searchByLaunchData(launchvl: boolean) {
    this.selctedLaunchData = launchvl;
    this.clickOnYear();
  }

  searchByLandingData(landvl: boolean, data: any) {
    this.selctedLandingData = landvl;
    this.clickOnYear();
    console.log(data);
  }
}


