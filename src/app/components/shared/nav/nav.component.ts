import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/modules/auth/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean
  user: string
  subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = authService.isLoggedInObs().subscribe(message => {
      this.isLoggedIn = message

    });
    console.log("nav component");
    console.log(this.isLoggedIn)
  }

  logout() {
    this.authService.logout()
    return '/'
  }

  ngOnInit(): void {
  }

}
