import { UpdateCateDTO } from './dto/update-category.dto';
import { CreateCateDTO } from './dto/create-category.dto';
import { Category } from './category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ICategoriesResultObject, ICategoryResultObject } from './category.interface';
import CategoryView from './view/category.view';

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
        const category = await this.categoryRepository.findOne(id);
        return new CategoryView(category);
    }

    async createCategory(createCateDTO: CreateCateDTO): Promise<CategoryView> {
        const {name} = createCateDTO;

        const category = new Category();
        category.name = name;

        const createdCategory = await this.categoryRepository.save(category);
        return new CategoryView(createdCategory);
    }

    async updateCategory(id: number, updateCateDTO: UpdateCateDTO): Promise<CategoryView> {
        const {name} = updateCateDTO;

        const category = await this.categoryRepository.findOne(id);
        category.name = name;
        
        await this.categoryRepository.save(category);
        return new CategoryView(category);
    }

    async deleteCategory(id: number): Promise<boolean> {
        const category = await this.categoryRepository.findOne(id);

        category.deletedAt = new Date();
        
        await this.categoryRepository.save(category);
        return true;
    }
}
