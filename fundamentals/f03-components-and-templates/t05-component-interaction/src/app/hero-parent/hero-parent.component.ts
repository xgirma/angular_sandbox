import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-parent',
  templateUrl: './hero-parent.component.html',
  styleUrls: ['./hero-parent.component.css']
})
export class HeroParentComponent implements OnInit {
  heroes = ['Dr IQ', 'Magneta', 'Bombasto'];
  master = 'Master';

  constructor() { }

  ngOnInit() {
  }

}
