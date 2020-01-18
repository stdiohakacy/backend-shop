export interface IProductData {
    name: string;
    price: number;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProductRO {
    product: IProductData;
}

export interface IProductsRO {
    products: IProductData[];
    count: number;
}
