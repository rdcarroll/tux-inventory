
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { buffer, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'my-barcode',
    templateUrl: './barcode.component.html'
})
export class BarcodeComponent implements OnInit, OnDestroy   {
    @Input() barcode: string="";
    @Input() readOnly: any;
    @Input() required = false;
    @Input() id: string;
    @Input() name: string;
    @Input() placeholder: string = "scan or type";
    @Output() barcodeChange = new EventEmitter<string>();
    barcodeText: string="";
    subject: Subject<any> = new Subject();
    constructor() {
        this.id = this.id || "test";
        this.name = this.name || "test";
    }

    onBarcodeChange(e: any) {
        const keycode = e.keyCode || e.which;
        this.barcodeText += String.fromCharCode(keycode);
        this.subject.next(this.barcodeText);
    }
    ngOnInit() {   
        if(null==this.barcode)this.barcode="";     
        var that = this; 
        this.subject
        .pipe(debounceTime(500))
        .subscribe((val) => {
            that.barcode=val.trim();
            that.barcodeText ="";
            that.barcodeChange.emit(that.barcode);
            }
        );
    }
    ngOnDestroy() {
        this.subject.unsubscribe();
    }
}

