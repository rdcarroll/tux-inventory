import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiClientService, Util, APIParms } from '../../../common/core';
import { finalize, map, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderItem } from '../sales';
import { identifierModuleUrl } from '@angular/compiler';

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
        return this.ApiClient.pGet(`orders/${orderid}/order_items`, q).pipe(take(1),map((res: any) => {
            this.order_items = res;
        }));
    }
    getOrder(orderid:number): Observable<any> {
        let q = {include:['Customer']}
        return this.ApiClient.pGet(`orders/${orderid}`, q).pipe(take(1));
    }
    
    save(orderitem:OrderItem, action:string): void {
        this.ApiClient.pPut(`order_items/${orderitem.ID}/${action}`, {}, orderitem).pipe(take(1))
            .subscribe(res => {
                this.util.alert("success", "Success Saving Order", false, { icon: 'check' }, true);
                this.getOrderItems(this.orderid).subscribe(res=>{
                });
            }, (err) => {
                this.util.handleError(err, "Error Saving");
            });

    }
    pickup(template: TemplateRef<any>) {
        this.getOrder(this.orderid).subscribe(res=>{
            this.order = res;
            this.getOrderItems(this.orderid).subscribe(res=>{
                this.dialogRef = this.dialog.open(template, {
                  width: '80%'
                });
                this.dialogRef.afterClosed().subscribe((result: any) => {
                    this.closeEdit.emit(true);
                  });
            });
        });
      }
      pickupBlur(item:any,evt:any) {
          let newbarcode = evt.target.value;
          item.notfound = false;
          if(newbarcode && item.InventoryItemID==null){
            let q = {filter:`Barcode|'${newbarcode}',Size|'${item.ItemSize}',InventoryID|${item.InventoryID}`}
            return this.ApiClient.pGet(`inventory_items`, q).pipe(take(1)).subscribe(res=>{
                if(res.count==0){
                    //alert("The barcode does not match an Inventory Item for the model and size selected.");
                    item.notfound = true;
                }
                else {
                    let ii = res.rows.filter((invitem:any) => {  return invitem.Barcode == newbarcode   })[0] || {};
                    item.InventoryItemID = ii.ID;
                    item.notfound = false;
                    this.save(item,'pickup');
                }
            });
          }
          else if(item.InventoryItemID){
            alert("Please use the Returns to remove this item.");
            this.getOrderItems(this.orderid).subscribe(res=>{
            });
          }
          
        }
    return(template: TemplateRef<any>) {
        this.getOrder(this.orderid).subscribe(res=>{
            this.order = res;
            this.getOrderItems(this.orderid).subscribe(res=>{
                this.dialogRef = this.dialog.open(template, {
                  width: '80%'
                });
                this.dialogRef.afterClosed().subscribe((result: any) => {
                    this.closeEdit.emit(true);
                  });
            });
        });
      }
      returnBlur(item:any,evt:any) {
          item.notfound=false;
        let returnbarcode = evt.target.value;
        if(returnbarcode && item.InventoryItem && item.InventoryItem.Barcode == returnbarcode){
            this.save(item,'return');
        }
        else if(returnbarcode && item.InventoryItem && item.InventoryItem.Barcode != returnbarcode){
            item.notfound=true;
        }
        }

    ngOnChanges(): void {
        
    }

    ngOnInit(): void {

    }
}
