import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  user: any = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUser()
    console.log(this.user)
  }

  loadUser() {
    this.user = null;

    this.authService.getMe().subscribe(user => {
      this.user = user;
    });
  }
}
