import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppComponent,
    RouterOutlet,
    FormsModule,
    MatDialogModule,
  ],
  exports: [],
})
export class SharedModule {}
