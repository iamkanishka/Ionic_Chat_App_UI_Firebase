import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment,  } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private readonly authService: AuthService, private readonly router: Router) { }
  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    try {
      const user = await this.authService.checkAuth();
      console.log(user);
      if (user) {
        return true;
      } else {
        this.navigate('/login');
        return false;
      }

    } catch (e) {
      console.log(e);
      this.navigate('/login')
      return false;

     
    }
  }

  navigate(url) {
    this.router.navigateByUrl(url, { replaceUrl: true })
  }
}
