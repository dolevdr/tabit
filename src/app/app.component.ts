import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DashboardModule } from './features/dashboard/dashboard.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [DashboardModule, InputSwitchModule, FormsModule, RouterOutlet],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  ngOnInit() {
    const mode = localStorage.getItem('mode');
    this.isDarkMode = mode === 'dark';
    this.updateHtmlClass();
  }

  toggleDarkMode(newValue: boolean) {
    this.isDarkMode = newValue;
    localStorage.setItem('mode', this.isDarkMode ? 'dark' : 'light');
    this.updateHtmlClass();
  }

  private updateHtmlClass() {
    const html = document.documentElement;
    if (this.isDarkMode) {
      html.classList.add('my-app-dark');
    } else {
      html.classList.remove('my-app-dark');
    }
  }
}
