import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from '../../../core';
import * as root from '../../../globals';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    returnUrl: string;
    isWindows: boolean;
    credentials = { uid: "", password: "" };

    constructor(private security: SecurityService, private route: ActivatedRoute) {
        this.isWindows = root.loginmodel.toString() == "windows";
    }
    login() {
        console.log(this.returnUrl);
        //where do i need to return to after authenticating? it should be returnUrl parameter, if it is passed in.
        this.security.authN(this.returnUrl);
    }

    ngOnInit() {
        this.returnUrl = decodeURI(this.route.snapshot.queryParamMap.get('returnUrl') || "");
        if (this.isWindows) this.login();
    }

}
