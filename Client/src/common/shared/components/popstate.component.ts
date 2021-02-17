import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Util } from '../../core';

@Component({
    selector: 'popstate-comp',
    template: ""
})

export class PopstateComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    @Output()
    popped = new EventEmitter<string>();

    constructor(private loadingService: Util, private router: Router) { }

    complete() {
        this.popped.emit('complete');
    }

    ngOnInit() {
        this.subscription = this.router.events.pipe(filter((event) => event instanceof NavigationStart))
            .subscribe((event: NavigationStart) => {
                if (event.navigationTrigger == "popstate")
                    this.complete();
            });

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
