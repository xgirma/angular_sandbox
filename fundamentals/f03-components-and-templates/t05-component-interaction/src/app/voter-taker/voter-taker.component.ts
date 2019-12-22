import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voter-taker',
  templateUrl: './voter-taker.component.html',
  styleUrls: ['./voter-taker.component.css']
})
export class VoterTakerComponent implements OnInit {
  agreed = 0;
  disagreed = 0;
  voters = ['Narco', 'Celeritas', 'Bombasto'];

  constructor() { }

  ngOnInit() {
  }

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }
}
