import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { tap, pluck } from 'rxjs/operators';

import { User } from '@app/shared/interfaces';

import { TokenStorage } from './token.storage';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}

  login(twitterHandle: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/login', { twitterHandle, password })
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }

  register(
    twitterHandle: string,
    password: string,
    repeatPassword: string
  ): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/register', {
        twitterHandle,
        password,
        repeatPassword,
      })
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }

  reset(
    changekey: string,
    password: string,
    repeatPassword: string
  ): Observable<any> {
    return this.http
      .post<any>('/api/auth/reset', {
        changekey,
        password,
        repeatPassword,
      });
  }

  sendResetKey(twitterHandle: string): Observable<any> {
    return this.http
      .post<any>('/api/auth/resetKey', { twitterHandle }); //Todo: not sure what I'm returning
  }

  setUser(user: User | null): void {
    if (user) {
      user.isAdmin = user.roles.includes('admin');
    }

    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  me(): Observable<User> {
    const token: string | null = this.tokenStorage.getToken();

    if (token === null) {
      return EMPTY;
    }

    return this.http.get<AuthResponse>('/api/auth/me').pipe(
      tap(({ user }) => this.setUser(user)),
      pluck('user')
    );
  }

  signOut(): void {
    this.tokenStorage.signOut();
    this.setUser(null);
  }

  getAuthorizationHeaders() {
    const token: string | null = this.tokenStorage.getToken() || '';
    return { Authorization: `Bearer ${token}` };
  }

  /**
   * Let's try to get user's information if he was logged in previously,
   * thus we can ensure that the user is able to access the `/` (home) page.
   */
  checkTheUserOnTheFirstLoad(): Promise<User> {
    return this.me().toPromise();
  }
}
