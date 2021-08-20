import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { Subject } from 'rxjs';
import { Constants } from '../constants'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager
  private _user: User | null = null;
  private _loginChangedSubject = new Subject<boolean>();

  constructor() {
    this._userManager = new UserManager(this.idpSettings);
  }

  private get idpSettings(): UserManagerSettings {
    return {
      authority: Constants.idpAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}/signin-callback`,
      scope: "openid profile companyApi",
      response_type: "code",
      post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback`
    }
  }

  public loginChanged = this._loginChangedSubject.asObservable();

  public login() {
    return this._userManager.signinRedirect();
  }

  public isAuthenticated(): Promise<boolean> {
    return this._userManager.getUser()
      .then(user => {
        this._user = user;
        return this.checkUser(user);
      })
  }

  private checkUser(user: User | null): boolean {
    return !!user && !user.expired
  }
}
