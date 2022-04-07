import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../../_shared/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private tokenStore: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     if (this.isLoggedIn()) {
     return true;
     }
     // navigate to login page as user is not authenticated
     this.router.navigate(['login']);
     return false;
    }

  public isLoggedIn(): boolean {
    let status = false;
    const token = this.tokenStore.getToken();
    if (token !== null) {
      //console.log('AuthGuard.IsLoggedIn.status: true');
      status = true;
    }
    else {
      status = false;
      }
    return status;
  }
}
