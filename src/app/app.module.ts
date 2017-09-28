import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as cloudinary from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import { AppComponent } from './app.component';

import { EntryListComponent, EntryComponent } from './entries';


@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    EntryListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CloudinaryModule.forRoot(cloudinary, {
        cloud_name: 'dhd1eov8v'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
