import { Component, OnInit } from '@angular/core';
import * as root from '../../../globals';

@Component({
    selector: 'my-nauthed',
    templateUrl: './nauthed.component.html'
})

export class NauthedComponent implements OnInit {
    link: string;
    title = `Unauthorized to use ${root.companyname}`;
    constructor() {}


    ngOnInit() {
        this.link = "/login"; 
    }
}
