import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { ApiClientService, Util } from '../../../common/core';
import { Event } from '../sales';
import { Router } from '@angular/router';

@Component({
    selector: 'event-detail',
    templateUrl: './event-detail.component.html'
})
export class eventDetailComponent implements OnInit {
    
    item: Event;
    id: string;

    constructor(
        private ApiClient: ApiClientService,
        private route: ActivatedRoute,
        private util: Util,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id === 'add') {
            this.item = new Event();
        }
        else {
            this.ApiClient.pGet("events/" + this.id, {include:[{'Orders':[{'OrderTickets':['Customer']}]}]}).pipe(take(1))
                .subscribe(res => this.item = res);
        }
    }

    add(): void {
        this.ApiClient.pPost("events", {}, this.item).pipe(take(1))
            .subscribe(res => {
                this.item = res;
                this.id = this.item.ID.toString();
                this.router.navigate(['/sales', 'events', this.item.ID]);
                this.util.alert("success", "Success Adding event", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Adding");
            });
    }

    save(): void {
        this.ApiClient.pPut("events/" + this.id, {}, this.item).pipe(take(1))
            .subscribe(res => {
                this.router.navigate(['/sales', 'events']);
                this.util.alert("success", "Success Saving event", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Saving");
            });
    }

    eventDateChanged(evt:Date): void {
        // let uDate = moment(evt);
        this.item.eventDate = evt;
    }
}