
export interface ProductResponse {
    id: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    weight: number;
}

export interface ProductsResponse {
    products: ProductResponse[],    
    total: number;
    totalPages: number;
    page: number;
    limit: number;
}


