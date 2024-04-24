import { Component } from '@angular/core';
import { User } from './models/user.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperHero Characters Angular App';
  user?: User | null;
  userName?: string = '';

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x,
      this.userName = this.user?.email
    });
  }

  logout() {
      this.accountService.logout();
  }

}
