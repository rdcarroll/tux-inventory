import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-nauthed',
    templateUrl: './nauthed.component.html'
})

export class NauthedComponent implements OnInit {
    link: string;
    constructor() {}


    ngOnInit() {
        this.link = "/login"; 
    }
}
