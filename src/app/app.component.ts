import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesModule } from './pages/heroes/heroes.module';
import { SharedModule } from './shared/shared.module';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroesModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'heroes-mindata';
  isLoading = false;
  constructor(private loadingService: LoadingService) {
    this.isLoading = this.loadingService.getLoading();
  }
}
