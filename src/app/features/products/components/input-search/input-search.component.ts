import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-input-search',
    imports: [],
    templateUrl: './input-search.component.html',
    styleUrl: './input-search.component.css',
})
export class InputSearchComponent {

    @Output() 
    search = new EventEmitter<string>();

    onSearch(query: string) {

        const trimmed = query.trim();
        if (!trimmed) return;

        this.search.emit(trimmed);
    }

}
