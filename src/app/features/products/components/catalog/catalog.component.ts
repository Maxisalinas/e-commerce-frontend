import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { ListComponent } from '../list/list.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { FiltersComponent } from '../filters/filters.component';
import { OrderBySelectorComponent } from '../order-by-selector/order-by-selector.component';
import { ProductsFilters } from '../../models/product-filters.model';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../../categories/services/models/category.interface';
import { AsyncPipe } from '@angular/common';


@Component({
    selector: 'app-catalog',
    imports: [PaginatorComponent, ListComponent, OrderBySelectorComponent, FiltersComponent, AsyncPipe],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.css',
})
export class CatalogComponent {

    private productService = inject(ProductService);
    private categoryService = inject(CategoryService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    
    categories$: Observable<Category[]> = this.categoryService.getCategories()
        .pipe(
            shareReplay(1)
        );

    private filters = toSignal(
        this.route.queryParamMap
            .pipe(
                map(params => ({
                    page: params.get('page') ?? '1',
                    limit: '12',
                    search: params.get('search') ?? '',
                    categoryId: params.get('categoryId') ?? undefined,
                    orderByPrice: params.get('orderByPrice') as 'asc' | 'desc' | undefined,
                }))
            ),
        {
            initialValue: {
                page: '1',
                limit: '12',
                search: '',
                categoryId: undefined,
                orderByPrice: undefined,
            }
        }
    );

    private result = toSignal(
        toObservable(this.filters)
            .pipe(
                switchMap(filters => this.productService.getProducts(filters))
            ),
        {
            initialValue: {
                products: [],
                total: 0,
                totalPages: 1,
                page: 1,
                limit: 12,
            }
        }
    );

    products = computed(() => this.result().products);
    totalProducts = computed(() => this.result().total);
    totalPages = computed(() => this.result().totalPages);
    currentPage = computed(() => this.result().page);

    private updateQueryParams(partial: Partial<ProductsFilters>) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: partial,
            queryParamsHandling: 'merge',
        });
    }

    onPageChange(page: number) {
        this.updateQueryParams({ page: page.toString() });
    }

    onOrderByChange(order: 'asc' | 'desc') {
        this.updateQueryParams({ orderByPrice: order, page: '1' });
    }

    onCategoryChange(categoryId: number) {
        this.updateQueryParams({ categoryId: categoryId.toString(), page: '1' });
    }

}