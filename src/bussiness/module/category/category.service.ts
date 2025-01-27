import { CreateCateDTO } from './dto/create-category.dto';
import { Injectable, NotFoundException, UnprocessableEntityException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, getRepository } from 'typeorm';
import { ICategoriesView } from './category.interface';
import CategoryView from './view/category.view';
import DataHelper from 'src/helpers/DataHelper';
import { Product } from 'src/bussiness/entities/product.entity';
import { IPaginationOptions } from '../pagination/pagination-options.interface';
import { Pagination } from '../pagination/pagination';
import * as faker from 'faker';
import { Category } from 'src/bussiness/entities/category.entity';
import ProductView from '../product/view/product.view';
import { ICategoryService } from 'src/bussiness/services/ICategoryService';

@Injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async findCategories(): Promise<ICategoriesView> {
        const [results, count] = await this.categoryRepository
            .findAndCount({
                order: {createdAt: 'DESC'}, 
                where: {deletedAt: IsNull()}});

        if (!results) {
            throw new NotFoundException();
        }

        const categories = CategoryView.transform(results);
        return {categories, count};
    }

    async initialCategories(): Promise<any> {
        for (let index = 0; index < 2; index++) {
            const fakerInstance = {
                name: faker.commerce.productName(),
            };
            this.createCategory(fakerInstance);
        }
    }

    async findCategory(id: number): Promise<CategoryView> {
        const category = await getRepository(Category)
            .createQueryBuilder('category')
            .whereInIds([id])
            .andWhere('category.deletedAt IS NULL')
            .getOne();

        if (!category) {
            throw new NotFoundException();
        }

        return new CategoryView(category);
    }

    async findProductsByCategory(id: number, options: IPaginationOptions): Promise<Pagination<ProductView>> {
        const category = await getRepository(Category)
            .createQueryBuilder('category')
            .whereInIds([id])
            .andWhere('category.deletedAt IS NULL')
            .getOne();

        if (!category) {
            throw new NotFoundException();
        }

        const [products, total] = await this.productRepository.findAndCount({
            order: {createdAt: 'DESC'},
            where: {deletedAt: IsNull(), categoryId: id},
            take: options.limit,
            skip: options.page * options.limit,
        });

        if (!products) {
            throw new NotFoundException();
        }

        const data = ProductView.transform(products);
        return new Pagination<ProductView>({ data, total });
    }

    async createCategory(createCateDTO: CreateCateDTO): Promise<CategoryView> {
        const findedCategory = this.categoryRepository.findOne({where: createCateDTO.name});
        if (findedCategory) {
            throw new ConflictException();
        }

        const category = new Category();
        category.name = createCateDTO.name;

        const createdCategory = await this.categoryRepository.save(category);
        if (!createdCategory) {
            throw new UnprocessableEntityException();
        }

        return new CategoryView(createdCategory);
    }

    async updateCategory(id: number, data: any): Promise<boolean> {
        const product = await this.categoryRepository.findOne(id);

        const fields = [
            'name',
        ];

        DataHelper.filterDataInput(product, data, fields);
        const updatedCategory = await this.categoryRepository.update(id, product);
        if (!updatedCategory) {
            throw new UnprocessableEntityException();
        }
        return true;
    }

    async deleteCategory(id: number): Promise<boolean> {
        const category = await this.categoryRepository.findOne(id);

        category.deletedAt = new Date();
        
        const deletedCategory = await this.categoryRepository.save(category);
        if (!deletedCategory) {
            throw new UnprocessableEntityException();
        }
        return true;
    }
}
