import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero-child',
  templateUrl: './hero-child.component.html',
  styleUrls: ['./hero-child.component.css']
})
export class HeroChildComponent implements OnInit {
  @Input() hero;
  // tslint:disable-next-line:no-input-rename
  @Input('master') masterName;

  constructor() { }

  ngOnInit() {
  }

}
