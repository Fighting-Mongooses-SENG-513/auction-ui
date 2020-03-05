import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    private token: string;
    private tokenTimer: any;

    private authStatusListener = new Subject<boolean>();
    private personaListener = new Subject<boolean>();


    constructor(private httpClient: HttpClient) {}

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
    getPersonaListener() {
        return this.personaListener.asObservable();
    }

    createUser(email: string, password: string, auctioneer: boolean) {
        const newUser = {email: email, password: password, auctioneer: auctioneer};
        return this.httpClient.post<TokenResponse>(`${environment.BASE_URL}/user/create`, newUser)
            .subscribe(response => {
                this.token = response.token;
                if (this.token) {
                    this.decodeToken(this.token);
                    this.setTokenTimer(response.expiresIn * 1000);
                    const timestamp = new Date();
                    this.setToken(this.token, new Date(timestamp.getTime() + response.expiresIn * 1000));
                    this.authStatusListener.next(true);

                }
            }, () => {
                // Failed account creation attempt
                this.authStatusListener.next(false);
            });
    }

    login(email: string, password: string) {
        const login = {email: email, password: password};
        return this.httpClient.post<TokenResponse>(`${environment.BASE_URL}/user/login`, login)
            .subscribe(response => {
                this.token = response.token;
                if (this.token) {
                    this.decodeToken(this.token);
                    this.setTokenTimer(response.expiresIn * 1000);
                    const timestamp = new Date();
                    this.setToken(this.token, new Date(timestamp.getTime() + response.expiresIn * 1000));
                    this.authStatusListener.next(true);
                }
            }, () => {
                // Failed login attempt
                this.authStatusListener.next(false);
            });
    }

    tryLogin() {
        const cookie = this.findStoredToken();
        if (!cookie) {
            return;
        } else {
            const now = new Date();
            const expiresIn = cookie.expirationDate.getTime() - now.getTime();
            if (expiresIn > 0) {
                this.token = cookie.token;
                this.decodeToken(this.token);
                this.setTokenTimer(expiresIn);
                this.authStatusListener.next(true);
            } else {
                return;
            }
        }
    }

    logout() {
        this.authStatusListener.next(false);
        this.token = null;
        clearTimeout(this.tokenTimer);
        this.removeToken();
    }

    private setTokenTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration); // milliseconds
    }

    private setToken(token: string, expirationDate: Date) {
        this.removeToken();
        localStorage.setItem(environment.TOKEN_NAME, token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private removeToken() {
        localStorage.removeItem(environment.TOKEN_NAME);
        localStorage.removeItem('expiration');
    }

    private findStoredToken() {
        const token = localStorage.getItem(environment.TOKEN_NAME);
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
            return;
        } else {
            return {token: token, expirationDate: new Date(expirationDate)};
        }
    }

    private decodeToken(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const payload = JSON.parse(window.atob(base64));
        if (payload.auctioneer !== 'undefined' || payload.auctioneer !== '') {
            this.personaListener.next(payload.auctioneer);
        }  
    }
}

export interface TokenResponse {
    token: string;
    expiresIn: number; // seconds
}