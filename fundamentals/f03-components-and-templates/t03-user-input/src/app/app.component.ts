import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 't03-user-input';
  clickMessage = '';

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }
}
