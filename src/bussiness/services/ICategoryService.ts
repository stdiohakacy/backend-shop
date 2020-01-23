import { ICategoriesView } from '../module/category/category.interface';
import CategoryView from '../module/category/view/category.view';
import { CreateCateDTO } from '../module/category/dto/create-category.dto';
import { Pagination } from '../module/pagination/pagination';
import ProductView from '../module/product/view/product.view';
import { IPaginationOptions } from '../module/pagination/pagination-options.interface';

export interface ICategoryService {
    findCategories(): Promise<ICategoriesView>;

    findCategory(id: number): Promise<CategoryView>;

    findProductsByCategory(id: number, options: IPaginationOptions): Promise<Pagination<ProductView>>;

    createCategory(createCateDTO: CreateCateDTO): Promise<CategoryView>;

    updateCategory(id: number, data: any): Promise<boolean>;

    deleteCategory(id: number): Promise<boolean>;
}
