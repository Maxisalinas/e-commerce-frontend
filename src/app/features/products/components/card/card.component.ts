import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-card',
    imports: [RouterLink, CurrencyPipe],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {

    @Input({ required: true })
    public product!: Product

}
