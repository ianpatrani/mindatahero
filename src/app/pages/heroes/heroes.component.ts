import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { Hero } from '../../models/hero';
import { HeroesMindataService } from '../../services/heroes-mindata.service';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource<Hero>([]);
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private heroesService: HeroesMindataService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadHeroes();
  }

  loadHeroes() {
    this.heroesService.getHeroes().subscribe((heroes) => {
      this.dataSource.data = heroes;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter() {
    this.heroesService.searchHeroes(this.searchTerm).subscribe((heroes) => {
      this.dataSource.data = heroes;
      this.dataSource.paginator = this.paginator;
    });
  }

  addHero() {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHeroes();
      }
    });
  }

  editHero(hero: Hero) {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '500px',
      data: hero,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHeroes();
      }
    });
  }

  deleteHero(id: number) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este heroe?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroesService.deleteHero(id).subscribe(() => {
          this.loadHeroes();
          Swal.fire('Eliminado', 'El héroe ha sido eliminado.', 'success');
        });
      }
    });
  }

  openHeroDetail(hero: Hero): void {
    this.dialog.open(HeroDetailComponent, {
      width: '600px',
      data: hero,
    });
  }
}
