export interface ProductsFilters {
    page: string;
    limit: string;
    search: string;
    categoryId?: string;
    orderByPrice?: 'asc' | 'desc';
}
