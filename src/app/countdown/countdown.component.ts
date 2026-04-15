import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy {
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  targetDate: Date = new Date('2025-10-18T00:00:00'); // tu fecha objetivo
  private intervalId: any;
  isToday: boolean = false; // 🔹 para mostrar el mensaje

  ngOnInit() {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCountdown() {
    const currentTime = new Date().getTime();
    const targetTime = this.targetDate.getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      // 🔹 Cuando ya sea la fecha
      this.isToday = true;
      this.days = this.hours = this.minutes = this.seconds = 0;
      clearInterval(this.intervalId); // detener el contador
      return;
    }

    this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  }
}
