import { Component, computed, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {

    @Input() totalPages: number = 1;
    @Input() currentPage: number = 1;
    @Output() pageChange = new EventEmitter<number>();

    pages = computed(() => Array.from({ length: this.totalPages }, (_, i) => i + 1));
    
    onChangePage(page: number) {
        if (page < 1 || page > this.totalPages) return;
        this.pageChange.emit(page);
    }

}