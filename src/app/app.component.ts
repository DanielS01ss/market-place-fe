import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'market-place-fe';

  darkMode = false;
  constructor(){
    this.detectColorScheme();
  }

  detectColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode = true;
      document.documentElement.setAttribute('data-theme', 'this.darkMode ? "dark" : "light"');
    }
}

toggleTheme(){
  this.darkMode = !this.darkMode;
  document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
}
}