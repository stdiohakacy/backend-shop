import { CreateCateDTO } from './dto/create-category.dto';
import { Category } from '../../entities/category.entity';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ICategoriesView } from './category.interface';
import CategoryView from './view/category.view';
import DataHelper from 'src/helpers/DataHelper';
import { Product } from 'src/entities/product.entity';
import ProductView from 'src/module/product/view/product.view';
import { IProductsView } from 'src/module/product/product.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async findCategories(): Promise<ICategoriesView> {
        const [categoriesRepository, count] = await this.categoryRepository
            .findAndCount({
                order: {createdAt: 'DESC'}, 
                where: {deletedAt: IsNull()}});

        const categories = CategoryView.transformList(categoriesRepository);
        return {categories, count};
    }

    async findCategory(id: number): Promise<CategoryView> {
        const category = await this.categoryRepository.findOne(id);
        if (!category.deletedAt) {
            return new CategoryView(category);
        }
    }

    async findProductsByCategory(id: number): Promise<IProductsView> {
        const category = await this.categoryRepository.findOne(id);
        if (category.deletedAt) {
            return null;
        }
        
        const [productsRepository, count] = await this.productRepository
            .findAndCount({
                order: {createdAt: 'DESC'}, 
                where: {categoryId: id, deletedAt: IsNull()},
            });

        const products = ProductView.transformList(productsRepository);
        return {products, count};
    }

    async createCategory(createCateDTO: CreateCateDTO): Promise<CategoryView> {
        const {name} = createCateDTO;

        const category = new Category();
        category.name = name;

        const createdCategory = await this.categoryRepository.save(category);
        return new CategoryView(createdCategory);
    }

    async updateCategory(id: number, data: any): Promise<boolean> {
        const product = await this.categoryRepository.findOne(id);

        const fields = [
            'name',
        ];

        DataHelper.filterDataInput(product, data, fields);
        await this.categoryRepository.update(id, product);

        return true;
    }

    async deleteCategory(id: number): Promise<boolean> {
        const category = await this.categoryRepository.findOne(id);

        category.deletedAt = new Date();
        
        await this.categoryRepository.save(category);
        return true;
    }
}
