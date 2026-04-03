import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../categories/services/models/category.interface';

@Component({

    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css'],
    standalone: true,
})
export class FiltersComponent {

    @Input() categories: Category[] = [];
    @Output() categoryChange = new EventEmitter<number>();

    onCategorySelected(categoryId: number) {
        this.categoryChange.emit(categoryId);
    }
    
}

