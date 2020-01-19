import ProductView from './view/product.view';
export interface IProductsResultObject {
    products: ProductView[];
    count: number;
}
