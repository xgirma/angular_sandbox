import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyup',
  templateUrl: './keyup.component.html',
  styleUrls: ['./keyup.component.css']
})
export class KeyupComponent implements OnInit {
  values1 = '';
  values2 = '';
  values3 = '';
  values4 = '';
  values5 = '';

  constructor() { }

  ngOnInit() {
  }

  onKey(event: any) {
    this.values1 += event.target.value + ' | ';
  }

  onKeyWithEventType(event: KeyboardEvent) {
    this.values2 += (event.target as HTMLInputElement).value + ' | ';
  }

  onKeyWithRefVariable(value: string) {
    this.values3 += value + ' | ';
  }

  onEnter(value: string) {
    this.values4 = value;
  }

  onEnterWithBlur(value: string) {
    this.values5 = value;
  }
}
