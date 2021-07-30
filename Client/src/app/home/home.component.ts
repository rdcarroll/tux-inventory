import { Component, OnInit } from '@angular/core';

import { Config } from '../../common/shared';
import * as root from '../../common/globals';
import { Util } from '../../common/core';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    config: Config;
    logs: any;
    esacs: any;
    upcoming_events: any;
    downloadpath: string;
    anchor_target: any;
    title:string = ""

    constructor(
        private util: Util
    ) {
        this.upcoming_events = [];
        this.downloadpath = '/dist';
        this.anchor_target = root.anchor_target;
    }

    getCompany(): void {
        let company = this.util.getData('company');
        this.title = `Welcome to ${company.Name} Management System`
    }
    ngOnInit(): void {
        this.getCompany();
    }

}

