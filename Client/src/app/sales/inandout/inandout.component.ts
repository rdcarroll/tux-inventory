import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiClientService, Util, APIParms } from '../../../common/core';
import { finalize, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderItem } from '../sales';

@Component({
    selector: 'my-inandout',
    templateUrl: './inandout.component.html'
})
export class inandoutComponent implements OnInit {
    @Input() pickingup : boolean = true;
    @Input() orderid : number;
    @Input() orderitemid : number;
    @Output() itemChange = new EventEmitter<object>();
    @Output() closeEdit = new EventEmitter<boolean>();
    dialogRef: any;
    order_items: any;
    order: any;


    constructor(
        private ApiClient: ApiClientService,
        private util: Util,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    getOrderItems(orderid:number): Observable<any> {
        let q = {include:['InventoryItem',{'Inventory':['InventoryType']}]}
        return this.ApiClient.pGet(`orders/${orderid}/order_items`, q).pipe(take(1));
    }
    getOrder(orderid:number): Observable<any> {
        let q = {include:['Customer']}
        return this.ApiClient.pGet(`orders/${orderid}`, q).pipe(take(1));
    }
    
    save(orderitem:OrderItem): void {
        this.ApiClient.pPut("order_items/" + orderitem.ID, {}, orderitem).pipe(take(1))
            .subscribe(res => {
                this.util.alert("success", "Success Saving Order", false, { icon: 'check' }, true);
            }, (err) => {
                this.util.handleError(err, "Error Saving");
            });

    }
    pickup(template: TemplateRef<any>) {
        this.getOrder(this.orderid).subscribe(res=>{
            this.order = res;
            this.getOrderItems(this.orderid).subscribe(res=>{
                this.order_items = res;
                this.dialogRef = this.dialog.open(template, {
                  width: '80%'
                });
            });
        });
      }
      pickupBlur(item:any,evt:any) {
          let newbarcode = evt.target.value;
          if(newbarcode){
            let q = {filter:`Barcode|'${newbarcode}',Size|'${item.ItemSize}',InventoryID|${item.InventoryID}`}
            return this.ApiClient.pGet(`inventory_items`, q).pipe(take(1)).subscribe(res=>{
                if(res.count==0){
                    alert("The barcode does not match an Inventory Item for the model and size selected.");
                }
                else {
                    let ii = res.filter((invitem:any) => {  return invitem.Barcode == newbarcode   })[0] || {};
                    
                    item.InventoryItemID = ii.ID;
                    
                    this.save(item);
                }
            });
          }
          
        }
    return(template: TemplateRef<any>) {
        const item = {
            orderid : this.orderid,
            orderitemid : this.orderitemid
          };
          this.dialogRef = this.dialog.open(template, {
            width: '250px',
            data: item
          });
      }
      returnBlur(item:any,evt:any) {
          
        }

    ngOnChanges(): void {
        
    }

    ngOnInit(): void {

    }
}
