import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent implements OnInit {
  @Input() name: string;
  @Output() voted = new EventEmitter<boolean>();
  didVote = false;

  constructor() { }

  ngOnInit() {
  }

  vote(agreed: boolean) {
    this.voted.emit(agreed);
    this.didVote = true;
  }
}
