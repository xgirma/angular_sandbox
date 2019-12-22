import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero-child',
  templateUrl: './hero-child.component.html',
  styleUrls: ['./hero-child.component.css']
})
export class HeroChildComponent implements OnInit {
  @Input() hero;
  @Input('master') masterName;

  constructor() { }

  ngOnInit() {
  }

}
