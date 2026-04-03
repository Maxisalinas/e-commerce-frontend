import { Component, inject, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Product } from '../../models/product.model';


@Component({
    selector: 'app-list',
    imports: [CardComponent],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
})
export class ListComponent {

    @Input()
    products: Product[] = [];

}
