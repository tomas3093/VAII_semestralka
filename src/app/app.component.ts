import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {

  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
