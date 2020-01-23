import { IPaginationOptions } from './../module/pagination/pagination-options.interface';
import { Pagination } from '../module/pagination/pagination';
import ProductView from '../module/product/view/product.view';
import { CreateProductDTO } from '../module/product/dto/create-product.dto';
export interface IProductService {
    findProducts(options: IPaginationOptions): Promise<Pagination<ProductView>>;

    findProduct(id: number): Promise<ProductView>;
    
    createProduct(createProductDTO: CreateProductDTO): Promise<ProductView>;

    updateProduct(id: number, data: any): Promise<boolean>;

    deleteProduct(id: number): Promise<boolean>;
}
