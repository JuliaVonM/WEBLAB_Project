import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbar, MatButton, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Technology radar';

  constructor(private authService: AuthService) {
  }

  isAdmin(): boolean {
    const roleName = this.authService.getRoleName();
    return roleName === "CTO" || roleName === "Tech-Lead";
  }

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }
}
