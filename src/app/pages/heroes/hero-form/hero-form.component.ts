import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroesMindataService } from '../../../services/heroes-mindata.service';
import { Hero } from '../../../models/hero';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private heroesService: HeroesMindataService,
    public dialogRef: MatDialogRef<HeroFormComponent>,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.heroForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.heroForm.valid) {
      this.loadingService.show();
      const hero: Hero = {
        ...this.heroForm.value,
        id: this.data ? this.data.id : 0,
      };

      if (this.data) {
        this.heroesService.updateHero(hero).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.heroesService.addHero(hero).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: () => {
            this.loadingService.hide();
          }
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
