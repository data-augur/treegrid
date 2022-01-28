import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData, dataSource, virtualData } from './datasource';
import { PageSettingsModel, SortSettingsModel, VirtualScrollService, TreeGrid } from '@syncfusion/ej2-angular-treegrid';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-treegrid';

// import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
// import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
// import { MenuEventArgs } from '@syncfusion/ej2-navigations';
// import { TreeGridComponent,  } from '@syncfusion/ej2-angular-treegrid';


interface EColumn {
  field: string;
  headerText: string;
  textAlign: string;
  format?: string;
  width: number;  
}

// <e-column field='taskID' headerText='Task ID' textAlign='Right' width=70></e-column>
// <e-column field='taskName' headerText='Task Name' textAlign='Left' width=200></e-column>
// <e-column field='startDate' headerText='Start Date' textAlign='Right' format='yMd' width=90></e-column>
// <e-column field='duration' headerText='Duration' textAlign='Right' width=80></e-column>
// <e-column width="150"> 
// <ng-template #template let-data> 
//   <button (click)="insert(data)" *ngIf="data.level == 0">INSERT CHILD</button> 
// </ng-template> 
// </e-column>

@Component({
  selector: 'app-root',
  template: `
  <ejs-treegrid #treegrid [dataSource]='data' height='600' childMapping='Crew' [treeColumnIndex]='1' [editSettings]='editSettings' 
    [enableVirtualization]=true
    [toolbar]='toolbar'
    (actionComplete)='actionComplete($event)'> 
  <e-columns> 
      <e-column field='TaskID' headerText='Task ID' isPrimaryKey='true' width='90' textAlign='Right' ></e-column> 
      <e-column field='FIELD1' headerText='Player Name' width='120'></e-column>
      <e-column field='FIELD2' headerText='Year' width='100' textAlign='Right'></e-column>
      <e-column field='FIELD3' headerText='Stint' width='120' textAlign='Right'></e-column>
      <e-column field='FIELD4' headerText='TMID' width='120' textAlign='Right'></e-column>
  </e-columns> 
  </ejs-treegrid>`,
  providers: [ToolbarService, EditService, PageService, VirtualScrollService]

  // template: `
  // <ejs-treegrid #treegrid [dataSource]='data' height='600' childMapping='subtasks' [treeColumnIndex]='0' [editSettings]='editSettings' 
  //   [toolbar]='toolbar'
  //   (actionComplete)='actionComplete($event)'> 
  // <e-columns> 
  //     <e-column field='taskID' headerText='Task ID' isPrimaryKey='true' width='90' textAlign='Right' ></e-column> 
  //     <e-column field='taskName' headerText='Task Name' textAlign='Left' width=200></e-column>
  //     <e-column field='startDate' headerText='Start Date' textAlign='Right' format='yMd' width=90></e-column>
  //     <e-column field='duration' headerText='Duration' textAlign='Right' width=80></e-column>
 
  // </e-columns> 
  // </ejs-treegrid>`,
  // providers: [ToolbarService, EditService, PageService]
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{ 
 
  public data: Object[] = []; 
  public editSettings: Object; 
  public toolbar: string[];
   
  @ViewChild('treegrid') 
  public treegrid: TreeGrid; 
 
  ngOnInit(): void { 
    // this.data = sampleData; 
    dataSource();
    this.data = virtualData;
    this.editSettings ={ allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Row", newRowPosition: 'Child'};   
    this.toolbar = ['Add', 'Edit', 'Delete' , 'Update' , 'Cancel'];
  } 

  actionComplete(args: any) {
    console.log('actionComplete', args);
    if (args.requestType == "save") { 
      // var index = args.index; 
      // this.treegrid.selectRow(index); // select the newly added row to scroll to it  
    } 
  }

}
