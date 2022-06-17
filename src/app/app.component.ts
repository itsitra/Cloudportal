import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  public idleTimer: number = 0;
  constructor(
    private router: Router
    , private userIdle: UserIdleService
    ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      // Start watching for user inactivity.
     console.log('constructior');
     this.userIdle.startWatching();
     // Start watching when user idle is starting.
     this.userIdle.onTimerStart().subscribe(count => {
       console.log('Start : ' + count);
       this.userIdle.onIdleStatusChanged().subscribe(status => {
        console.log('Status ' + status);
         if (status === false) {
          // this.userIdle.stopTimer();
         }
       });
    });
     // Start watch when time is up.
     this.userIdle.onTimeout().subscribe(() => {
      console.log('Time is up!');
      this.doLogout();
     });
    });
  }
  doLogout() {
    if (localStorage.getItem('customerid') !== '') {
      localStorage.setItem('customerid', '0');
      this.router.navigateByUrl('login');
    }
  }
}
