import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../../models/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<HeroDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {}

  onClose() {
    this.dialogRef.close();
  }
}
