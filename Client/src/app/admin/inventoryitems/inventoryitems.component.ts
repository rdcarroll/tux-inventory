import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../admin';
import { ApiClientService, Util, APIParms } from '../../../common/core';
import { finalize, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Column, Config } from '../../../common/shared';

@Component({
    selector: 'my-inventoryitems',
    templateUrl: './inventoryitems.component.html'
})
export class inventoryitemsComponent implements OnInit {
    items: InventoryItem[];
    config: Config;
    searchText: string;
    columns : Column[] = [
        {
            display: 'Model Name', //The text to display
            variable: 'Inventory.ModelName', //The name of the key that's apart of the data array
            filter: 'text', //The type data type of the column (number, text, date, etc.)
            sortable: false
        },
        {
            display: 'SKU',
            variable: 'Barcode',
            filter: 'text',
            sortable: false
        },
        {
            display: 'Size',
            variable: 'Size',
            filter: 'text',
            sortable: false
        },
        {
            display: 'Status',
            variable: 'Status.Name',
            filter: 'text',
            sortable: false
        },
        {
            filter: 'button',
            type: 'edit'
        },
        {
            filter: 'button',
            type: 'delete'
        }
    ];

    constructor(
        private ApiClient: ApiClientService,
        private util: Util,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.config = {
            page: 1,
            collectionSize: 0,
            maxSize: 5,
            pageSize: this.util.PageSize()
        };
    }

    pageChange(): void {

        let q: APIParms = {
            pageSize: this.config.pageSize, page: (this.config.page),
            include:['Inventory','Status']
        }

        if (this.searchText && this.searchText.length > 0) q.qf = [this.searchText,'Barcode','Size'];

        this.util.loading(true, null);
        this.ApiClient.pGet("inventory_items", q).pipe(finalize(() => this.util.loading(false, null)), take(1))
            .subscribe(
                (res) => {
                    this.items = res.rows;
                    this.config.collectionSize = res.count;
                }, (err) => {
                    this.util.alert("error", err.statusText, false, null);
                });
    }
    searchChanged(s: string) {
        this.searchText = s;
        this.config.page = 1;
        this.pageChange();
    }
    gridPageChange(page: number): void {
        this.config.page = page;
        this.pageChange();
    }
    remove(id: number): void {
        this.ApiClient.pRemove("inventory_items/" + id, {}).pipe(take(1))
            .subscribe(res => {
                this.util.alert("success", "Inventory Item was successfully removed.", false, { icon: 'check' }, true);
                this.pageChange();
            }, (err) => {
                this.util.handleError(err, "Error Removing");
            });
    }


    getRow(row: any): void {
        //this.router.navigate(['/admin/administrators', row.ID]);
    }
    getBtn(args: any): void {
        switch (args[1]) {
            case "edit":
                this.router.navigate(['/admin/inventoryitems', args[0].ID]);
                break;
            case "delete":
                if (confirm("Are you sure?")) {
                    this.remove(args[0].ID)
                }
                break;
        }
    }

    ngOnInit(): void {
        this.searchText = this.route.snapshot.queryParamMap.get('keyword') || '';
        this.pageChange();
    }
}
