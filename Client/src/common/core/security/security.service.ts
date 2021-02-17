import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { CurrentUser } from '../app';
import { ApiClientService } from '../services/api-client.service';
import { take } from 'rxjs/operators';

@Injectable()
export class SecurityService {
    constructor(private http: HttpClient, private ApiClient: ApiClientService ) { }

    private userSubject = new Subject<CurrentUser>();
    private authZSubject = new Subject<object>();
    private returnUrl: string;

    getUser(): CurrentUser{
        let value = JSON.parse(sessionStorage.getItem('currentUser'));
        var cu: CurrentUser = typeof value === 'object' ? value : null;
        return cu;
    }
    getReturnUrl(): string {
        return this.returnUrl;
    }
    setReturnUrl(stateUrl: string): string {
        //let t = stateUrl == "/landing" ? "" : stateUrl;
        this.returnUrl = this.returnUrl ?? stateUrl;
        return this.returnUrl;
    }
    getUserMessage(): Observable<any> {
        return this.userSubject.asObservable();
    }
    getAuthzMessage(): Observable<any> {
        return this.authZSubject.asObservable();
    }

    authN(returnUrl: string): void {
        this.returnUrl = returnUrl;
        this.http.get('/logon').subscribe((user:any) => {
                if (user) {
                    // store user details and token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    this.userSubject.next(user);
                }
                else {
                    this.userSubject.next(null);
                }
            });
    }
    authZ() {
        this.ApiClient.pGet("Users/Me", {}).pipe(take(1))
            .subscribe(res => {
                let roleId: number = 0;
                if (res.ActiveFlag) roleId += this.Access.User;
                if (res.IsAdmin) roleId += this.Access.Admin;
                res.role_id = roleId;
                // store user details and token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('currentUser', JSON.stringify(res));
                this.authZSubject.next({ success: roleId > 0 });
            }, (err) => {
                this.authZSubject.next({ success: false });
            });
    }

    isAuthenticated() {
        if (sessionStorage.getItem('currentUser')) {
            // logged in so return true 
            return true;
        }
        return false;
    }

    Access = {
        User: 1,
        Admin: 2
    }

    hasAccess(node: number): boolean {
        let user = this.getUser();
        let roleId: number = user ? user.role_id : 0;
        return (roleId & node) == node;
    }

    logout():void {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        this.userSubject.next(null);
    }
}