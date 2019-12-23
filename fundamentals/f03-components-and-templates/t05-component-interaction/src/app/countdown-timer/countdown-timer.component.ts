import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  intervalId = 0;
  message = '';
  seconds = 11;

  constructor() { }

  ngOnInit() {
    this.start();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  start() {
    this.countDown();
  }

  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} second`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
      } else {
        if (this.seconds < 0) { this.seconds = 10; }
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }
}
