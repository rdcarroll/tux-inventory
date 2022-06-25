
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';


@Component({
    selector: 'my-barcode',
    templateUrl: './barcode.component.html'
})
export class BarcodeComponent implements OnInit, OnChanges   {
    @Input() barcode: string;
    @Input() readOnly: any;
    @Input() required = false;
    @Input() id: string;
    @Input() name: string;
    @Input() placeholder: string;
    @Output() barcodeChange = new EventEmitter<string>();
    barcodeText: string;
    constructor() {
        this.id = this.id || "test";
        this.name = this.name || "test";
    }

    ngOnInit() {
    }
    ngOnChanges() {
    }
}

