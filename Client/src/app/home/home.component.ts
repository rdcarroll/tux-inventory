import { Component, OnInit } from '@angular/core';

import { Config } from '../../common/shared';
import * as root from '../../common/globals';

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

    constructor(
    ) {
        this.upcoming_events = [];
        this.downloadpath = '/dist';
        this.anchor_target = root.anchor_target;
    }

    getLogList(): void {
        //this.ApiClient.pGet("AMSLogs", q)
        //    .pipe( take(1))
        //    .subscribe(res => {
        //        this.logs = res.value;
        //    });
    }


    ngOnInit(): void {
        this.getLogList();
    }

}

