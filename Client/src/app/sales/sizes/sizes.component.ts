import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiClientService, Util, APIParms } from '../../../common/core';
import { finalize, map, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderItem } from '../sales';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
    selector: 'my-sizes',
    templateUrl: './sizes.component.html'
})
export class sizesComponent implements OnInit {
    @Input() customerid : number;
    @Output() itemChange = new EventEmitter<object>();
    @Output() closeEdit = new EventEmitter<boolean>();
    dialogRef: any;
    customer: any;
    customer_sizes: any[];
    customer_size: any;


    constructor(
        private ApiClient: ApiClientService,
        private util: Util,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
    ) {
    }


    getCustomer(customerID:number): Observable<any> {
        let q = {include:['CustomerSizes']}
        return this.ApiClient.pGet(`customers/${customerID}`, q).pipe(take(1),map((res: any) => {
            this.customer = res;
        }));
    }
    
    save(orderitem:OrderItem, action:string, parms?:any): void {
        // parms = parms || {};
        // this.ApiClient.pPut(`order_items/${orderitem.ID}/${action}`, parms, orderitem).pipe(take(1))
        //     .subscribe(res => {
        //         this.util.alert("success", "Success Saving Order", false, { icon: 'check' }, true);
        //         this.getOrderItems(this.orderid).subscribe(res=>{
        //         });
        //     }, (err) => {
        //         this.util.handleError(err, "Error Saving");
        //     });

    }
        
    size(template: TemplateRef<any>) {
        this.getCustomer(this.customerid).subscribe(res=>{
            
            //default
            if(this.customer.CustomerSizes.length){
                this.customer_size = this.customer.CustomerSizes[0];
            }
            else{
                this.customer_size = {};
            }
            this.dialogRef = this.dialog.open(template, {
              width: '80%'
            });
            this.dialogRef.afterClosed().subscribe((result: any) => {
                this.closeEdit.emit(true);
              });
        });
      }
      sizeSave() {
        // this.ApiClient.pPut(`orders/${this.orderid}/pickup`, {}, {}).pipe(take(1))
        //     .subscribe(res => {
        //         this.util.alert("success", "Success Picking Up Order", false, { icon: 'check' }, true);
        //         this.closeEdit.emit(true);
        //     }, (err) => {
        //         this.util.handleError(err, "Error Picking Up Order");
        //     });
        }



    ngOnChanges(): void {
        
    }

    ngOnInit(): void {

    }
}
