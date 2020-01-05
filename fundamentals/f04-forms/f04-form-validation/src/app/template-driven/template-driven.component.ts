import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = {name: 'John', alterEgo: 'John What', power: this.powers[0]};

  constructor() { }

  ngOnInit() {
  }

}
