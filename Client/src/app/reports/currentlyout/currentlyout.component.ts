import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { ApiClientService, Util } from '../../../common/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'currentlyout',
    templateUrl: './currentlyout.component.html'
})
export class currentlyoutComponent implements OnInit {
    
    items: any[];

    constructor(
        private ApiClient: ApiClientService,
        private util: Util,
        private route: ActivatedRoute,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.ApiClient.pGet("inventory_items", {filter:"StatusID|3,Barcode|!null",include:['Status',{'Inventory':['InventoryType']}]}).pipe(take(1))
            .subscribe(res =>{
                this.items = res.rows;
            } );
    }


}