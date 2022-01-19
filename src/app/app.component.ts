import { Component, OnInit } from '@angular/core';
import { sampleData } from './datasource';
import { PageSettingsModel, SortSettingsModel } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-root',
  template: `
  <ejs-treegrid [dataSource]='data' height='100vh' width='100%' [treeColumnIndex]='1'  [allowFiltering]="true" [sortSettings]="sortSettings"
  [allowSorting]="true" [allowPaging]="false" [pageSettings]='pageSettings'childMapping='subtasks'>
  <e-columns>
      <e-column field='taskID' headerText='Task ID' textAlign='Right' width=70></e-column>
      <e-column field='taskName' headerText='Task Name' textAlign='Left' width=200></e-column>
      <e-column field='startDate' headerText='Start Date' textAlign='Right' format='yMd' width=90></e-column>
      <e-column field='duration' headerText='Duration' textAlign='Right' width=80></e-column>
  </e-columns>
  </ejs-treegrid>
  
  `
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularTreeGrid';

  public data: Object[];
  public sortSettings: SortSettingsModel;
  public pageSettings: PageSettingsModel;

  ngOnInit(): void {
    this.data = sampleData;
    this.sortSettings = { columns: [{ field: 'taskName', direction: 'Ascending' }, { field: 'taskID', direction: 'Descending' }]  };
    this.pageSettings = { pageSize: 10 };
  }
  
}
