import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ThemeStore } from './core/state/theme.state';
import { DashboardModule } from './features/dashboard/dashboard.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [DashboardModule, InputSwitchModule, FormsModule, RouterOutlet],
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  themeStore = inject(ThemeStore);
  isDarkMode = computed(() => this.themeStore.mode() === 'dark');

  toggleDarkMode(newValue: boolean): void {
    this.themeStore.setMode(newValue ? 'dark' : 'light');
  }
}
