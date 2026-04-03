import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroments';
import { Category } from './models/category.interface';
import { CategoryResponse } from '../dtos/category-response.dto';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {

    private http = inject(HttpClient);
    private apiBaseUrl = environment.apiUrl


    getCategories(): Observable<Category[]> {
        return this.http.get<CategoryResponse[]>(`${this.apiBaseUrl}/categories`).pipe(
            map((response => response.map(category => this.mapToCategory(category))))
        );
    }

    private mapToCategory(dto: CategoryResponse): Category {
        return {
            id: dto.id,
            name: dto.name,
        };
    }

}
