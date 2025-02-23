import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HeroesComponent } from './heroes.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UpperCaseDirective } from '../../directives/uppercase.directive';

@NgModule({
  declarations: [HeroesComponent, HeroFormComponent, HeroDetailComponent],
  imports: [
    CommonModule,
    MatTableModule,
    RouterLink,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    UpperCaseDirective,
    FormsModule,
    RouterOutlet,
  ],
  exports: [HeroesComponent, HeroFormComponent, HeroDetailComponent],
})
export class HeroesModule {}
