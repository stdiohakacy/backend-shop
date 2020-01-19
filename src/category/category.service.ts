import { CreateCateDTO } from './dto/create-category.dto';
import { Category } from './category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ICategoriesResultObject } from './category.interface';
import CategoryView from './view/category.view';
import DataHelper from 'src/helpers/DataHelper';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async findCategories(): Promise<ICategoriesResultObject> {
        const [categoriesRepository, count] = await this.categoryRepository
            .findAndCount({
                order: {createdAt: 'DESC'}, 
                where: {deletedAt: IsNull()}});

        const categories = CategoryView.transformList(categoriesRepository);
        return {categories, count};
    }

    async findCategory(id: number): Promise<CategoryView> {
        const category = await this.categoryRepository.findOne(id, {where: {deletedAt: IsNull()}});
        return new CategoryView(category);
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
