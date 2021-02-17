
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

//<my-richtexteditor [(myModel)]="employee_badge" [options]="employees"></my-richtexteditor>

@Component({
    selector: 'my-richtexteditor',
    templateUrl: './richtexteditor.component.html'
})
export class RichTextEditorComponent implements OnInit, OnChanges  {
    @Input() myModel: string;
    @Input() options: any[];
    @Input() placeholder: string;
    @Input() name: string;
    @Output() myModelChange: EventEmitter<string> = new EventEmitter<string>();
    editorConfig: AngularEditorConfig;
    rt_html: string;

    config: any = {
        height: 500,
       // theme: 'modern',
        // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
        plugins: 'paste noneditable table lists',
        toolbar: 'undo redo | formatselect | bold italic underline strikethrough | bullist numlist outdent indent | blockquote | removeformat | table',
        menubar: 'file | edit | view | format | table | tools',
        spellchecker_languages: "+English=en",
        browser_spellcheck: true
    };

    constructor() {
        this.editorConfig = { editable: true, height: '500px' };
    }

    htmlChanged(evt:any): void {
        this.myModelChange.emit(evt);
    }
    ngOnChanges(): void {
        this.rt_html = this.myModel;
    }


    ngOnInit() {
        this.placeholder = this.placeholder || "Enter text here...";
    }
    //ngOnChanges(): void {
    //    this.rt_html = this.myModel;
    //}
    //isEmpty(value: any) {
    //    return (!value || 0 === value.length);
    //}
}
