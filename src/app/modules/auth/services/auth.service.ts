import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';

export interface CredentialsDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: any;
}

export interface SignupResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    const body: CredentialsDto = {
      username,
      password,
    };

    return this.httpClient.post<LoginResponse>(
      `${environment.authapiUrl}/login`, body
    ).pipe(
      tap(response => {
        // if the login was successful the server responds with an auth token which will be saved
        this.setToken(response.token, response.user.username, response.user._id);
        this.isLoginSubject.next(true);
      }),
      catchError(error => {
        // if an error occurs it will be logged ans passed along as error
        console.log('error', error);
        // TODO: add error handling
        return throwError(error);
      }),
    );

  }

  signup(username: string, password: string) {
    const body: CredentialsDto = {
      username,
      password,
    };

    return this.httpClient.post<SignupResponse>(
      `${environment.authapiUrl}/signup`, body
    ).pipe(
      tap(response => {
        // if the login was successful the server responds with an auth token which will be saved
        this.setToken(response.token, response.user.username, response.user._id);
        this.isLoginSubject.next(true);
      }),
      catchError(error => {
        let errors = [];
        error.error.msg ? errors.push(error.error.msg) : errors.push(error.error.errors["0"].msg);
        console.log("errors" + errors);
        return throwError(errors);
      }),
    );
  }

  logout() {
    // performing any logout logic as observable
    this.isLoginSubject.next(false);
    return new Observable(observer => {
      this.removeToken();
      observer.next();
      observer.complete();
    });
  }

  /**
   * used on app startup to check if an existing token is still valid.
   * If so, everything is fine.
   * If not, the token will be removed.
   */
  initializeSession(): Promise<void> {
    console.log('⚡️ initialize app');
    console.log('existing token:', this.getToken());

    if (this.getToken() != null) {
      // accessing a secured API call. If this call returns an error the token is not valid anymore
      return this.getMe()
        .pipe(
          catchError(() => {
            // token is invalid. Remove it and return a new observable
            this.removeToken();
            return of(null);
          }),
          map(() => null),
        )
        .toPromise();
    }

    return Promise.resolve();
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

  isLoggedInObs(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  setToken(authToken: string, user: any, id: string) {
    console.log('storing token', authToken);
    localStorage.setItem('loggedUser', JSON.stringify({'name': user, 'id': id, 'token': authToken}));
  }

  getID() {
    let userID = JSON.parse(localStorage.getItem('loggedUser'));
    return userID ? userID.id : null;
  }

  getUsername() {
    let userName = JSON.parse(localStorage.getItem('loggedUser'));
    return userName ? userName.name : null;
  }

  getToken() {
    let authToken = JSON.parse(localStorage.getItem('loggedUser'));
    return authToken ? authToken.token : null;
    // return authToken.token || null;
  }

  removeToken() {
    localStorage.removeItem('loggedUser');
  }


  getMe() {
    let httpOptions;
    if (this.getToken() != null) {
      httpOptions = {
        headers: new HttpHeaders({'token': this.getToken()})
      };
    }

    return this.httpClient.get(`${environment.apiUrl}/user/${this.getID()}`, httpOptions);
  }
}
