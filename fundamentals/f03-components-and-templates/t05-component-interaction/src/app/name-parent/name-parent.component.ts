import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-parent',
  templateUrl: './name-parent.component.html',
  styleUrls: ['./name-parent.component.css']
})
export class NameParentComponent implements OnInit {
  names = ['Dr IQ', '   ', '  Bombasto  '];

  constructor() { }

  ngOnInit() {
  }

}
