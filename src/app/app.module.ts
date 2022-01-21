import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { PageService, SortService, FilterService, EditService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridModule
  ],
  providers: [PageService,
    SortService,
    FilterService,
    ContextMenuService,
    EditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
