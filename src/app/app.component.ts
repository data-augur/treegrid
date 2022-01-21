import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './datasource';
import { PageSettingsModel, SortSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { TreeGridComponent,  } from '@syncfusion/ej2-angular-treegrid';


@Component({
  selector: 'app-root',
  template: `
  <ejs-treegrid #treegrid [dataSource]='data' height='100vh' width='100%' [treeColumnIndex]='1'
    [allowFiltering]="true" [sortSettings]="sortSettings"
    [contextMenuItems]='contextMenuItems'
    (contextMenuClick)='contextMenuClick($event)' (contextMenuOpen)='contextMenuOpen($event)'
    [allowSorting]="true" childMapping='subtasks'[selectionSettings]='selectionSettings' 
    [editSettings]='editSettings'>

  <e-columns>
      <e-column field='taskID' headerText='Task ID' textAlign='Right' width=70></e-column>
      <e-column field='taskName' headerText='Task Name' textAlign='Left' width=200></e-column>
      <e-column field='startDate' headerText='Start Date' textAlign='Right' format='yMd' width=90></e-column>
      <e-column field='duration' headerText='Duration' textAlign='Right' width=80></e-column>
  </e-columns>
  </ejs-treegrid>
  `,
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularTreeGrid';

  public data: Object[];
  public sortSettings: SortSettingsModel;
  //public pageSettings: PageSettingsModel;
  public editSettings: Object;
  public selectionSettings: Object;
  public contextMenuItems: Object[];
  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;
  public pageSettings: Object;

  ngOnInit(): void {
    this.data = sampleData;
    this.selectionSettings = { type: 'Multiple' };
    this.editSettings = {allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Row"};
    this.sortSettings = { columns: [{ field: 'taskName', direction: 'Ascending' }, { field: 'taskID', direction: 'Descending' }]  };
    this.contextMenuItems =  [
      {text: 'Add Next', target: '.e-content', id: 'addnext'},
      {text: 'Add Child', target: '.e-content', id: 'addchild'},
      {text: 'Del Row', target: '.e-content', id: 'delrow'},
      {text: 'Edit Row', target: '.e-content', id: 'editrow'},
      {text: 'Multi Select', target: '.e-content', id: 'multiselect'},
      {text: 'Copy Rows', target: '.e-content', id: 'copyrows'},
      {text: 'Cut Rows', target: '.e-content', id: 'cutrows'},
      {text: 'PasteNext', target: '.e-content', id: 'pastenext'},
      {text: 'PasteChild', target: '.e-content', id: 'pastechild'},
  ];
  }
  contextMenuClick(args?: MenuEventArgs): void {
    this.treegrid.getColumnByField('taskID');
    console.log(this.treegrid.getSelectedRows()[0].getAttribute('aria-rowindex'));

    if (args.item.id === 'addnext') {
        this.treegrid.collapseRow(<HTMLTableRowElement>(this.treegrid.getSelectedRows()[0]));
    }if (args.item.id === 'delrow') {
      this.treegrid.deleteRow(<HTMLTableRowElement>(this.treegrid.getSelectedRows()[0]));
      console.log(this.data)
  }
  if (args.item.id === 'editrow') {
    this.treegrid.startEdit(<HTMLTableRowElement>(this.treegrid.getSelectedRows()[0]));
    console.log(this.data)
   }if (args.item.id === 'addnext') {
     this.treegrid.addRecord()
  // this.treegrid.startEdit(<HTMLTableRowElement>(this.treegrid.getSelectedRows()[0]));
    console.log(this.data)
   } else {
        this.treegrid.expandRow(<HTMLTableRowElement>(this.treegrid.getSelectedRows()[0]));
        }
}
contextMenuOpen(arg?: BeforeOpenCloseEventArgs) : void {
    let elem: Element = arg.event.target as Element;
    let uid: string = elem.closest('.e-row').getAttribute('data-uid');
    if (isNullOrUndefined(getValue('hasChildRecords', this.treegrid.grid.getRowObjectFromUID(uid).data))) {
        arg.cancel = true;
    } else {
        let flag: boolean = getValue('expanded', this.treegrid.grid.getRowObjectFromUID(uid).data);
        let val: string = flag ? 'none' : 'block';
        document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
        val = !flag ? 'none' : 'block';
        document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
    }
}

}
