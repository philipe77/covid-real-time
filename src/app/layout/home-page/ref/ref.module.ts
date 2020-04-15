import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefRoutingModule } from './ref-routing.module';
import { RefComponent } from './ref.component';


@NgModule({
  declarations: [RefComponent],
  imports: [
    CommonModule,
    RefRoutingModule
  ]
})
export class RefModule { }
