import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiClientService, Util, APIParms } from '../../../../common/core';
import { finalize, map, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
    selector: 'business-inandout',
    templateUrl: './inandout.component.html'
})
export class BusinessInandoutComponent {
    @Output() itemChange = new EventEmitter<object>();
    @Output() closeEdit = new EventEmitter<boolean>();
    dialogRef: any;
    status_types: any;
    status_type: any;


    constructor(
        private ApiClient: ApiClientService,
        private util: Util,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    getOrderItems(): Observable<any> {
        return this.ApiClient.pGet(`status_types`, {}).pipe(take(1),map((res: any) => {
            this.status_types = res;
        }));
    }
    
    pickup(template: TemplateRef<any>) {
        this.getOrderItems().subscribe(res => {
            this.dialogRef = this.dialog.open(template, {
              width: '80%'
            });
            this.dialogRef.afterClosed().subscribe((result: any) => {
                this.closeEdit.emit(true);
              });
        }, (err) => {
            this.util.handleError(err, "Error Saving");
        });
      }
    save(): void {
        // this.ApiClient.pPut(`order_items/${orderitem.ID}/${action}`, {}, orderitem).pipe(take(1))
        //     .subscribe(res => {
        //         this.util.alert("success", "Success Saving Order", false, { icon: 'check' }, true);
        //         this.getOrderItems(this.orderid).subscribe(res=>{
        //         });
        //     }, (err) => {
        //         this.util.handleError(err, "Error Saving");
        //     });

    }
}
