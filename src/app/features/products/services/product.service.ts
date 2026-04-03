import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable} from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../enviroments/enviroments";
import { ProductsFilters } from "../models/product-filters.model";
import { ProductsResponse, ProductResponse } from "../dtos/product-response.dto";
import { Product } from "../models/product.model";


@Injectable({ providedIn: 'root' })
export class ProductService {

    private http = inject(HttpClient);
    private apiBaseUrl = environment.apiUrl;

    getProducts(filters: ProductsFilters): Observable<{ products: Product[]; total: number; totalPages: number; page: number; limit: number }> {

        let params = new HttpParams();
        if (filters.page) params = params.set('page', filters.page);
        if (filters.limit) params = params.set('limit', filters.limit);
        if (filters.search !== '') params = params.set('search', filters.search);
        if (filters.categoryId !== undefined) params = params.set('categoryId', filters.categoryId);
        if (filters.orderByPrice) params = params.set('orderByPrice', filters.orderByPrice);

        return this.http.get<ProductsResponse>(`${this.apiBaseUrl}/products`, { params })
            .pipe(map(dto => ({
                products: this.mapToProductFromList(dto.products),
                total: dto.total,
                totalPages: dto.totalPages,
                page: dto.page,
                limit: dto.limit
            })));
    }


    getProductById(id: number): Observable<Product> {
        return this.http.get<ProductResponse>(`${this.apiBaseUrl}/products/${id}`)
            .pipe(map(dto => this.mapToProduct(dto)));
    }


    private mapToProduct(dto: ProductResponse): Product {
        return {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            price: dto.price,
            stock: dto.stock,
            imageUrl: dto.imageUrl
        };
    }

    private mapToProductFromList(dto: ProductResponse[]): Product[] {
        return dto.map(p => this.mapToProduct(p));
    }

}