import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-order-by-selector',
    templateUrl: './order-by-selector.component.html',
    styleUrl: './order-by-selector.component.css',
})
export class OrderBySelectorComponent {
    
    @Output() orderChange = new EventEmitter<'asc' | 'desc'>();

    onOrderBySelected(orderByPrice: 'asc' | 'desc') {
        this.orderChange.emit(orderByPrice);
    }
    
}