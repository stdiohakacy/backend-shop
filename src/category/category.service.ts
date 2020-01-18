import { UpdateCateDTO } from './dto/update-category.dto';
import { CreateCateDTO } from './dto/create-category.dto';
import { Category } from './category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { ICategoryRO, ICategoriesRO } from './category.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    private buildCategory(categoryEntity: Category) {
        const buildedCategory = {
            name: categoryEntity.name,
            createdAt: categoryEntity.createdAt,
            updatedAt: categoryEntity.updatedAt,
        };
        return {category: buildedCategory};
    }

    private buildCategories(categoriesEntity: Category[]) {
        const builedCategories = [];
        for (const categoryEntity of categoriesEntity) {
            const data = this.buildCategory(categoryEntity);
            builedCategories.push(data);
        }
        return builedCategories;
    }

    async findCategories(): Promise<ICategoriesRO> {
        const query = await getRepository(Category).createQueryBuilder('category');

        query.orderBy('createdAt', 'DESC');
        query.where('deletedAt IS NULL');

        const count = await query.getCount();
        const categories = await query.getMany();
        const buildedCategories = this.buildCategories(categories);

        return {categories: buildedCategories, count};
    }

    async findCategory(id: number): Promise<ICategoryRO> {
        const category = await this.categoryRepository.findOne(id);

        const entity = new Category();
        entity.name = category.name;
        
        return this.buildCategory(entity);
    }

    async createCategory(createCateDTO: CreateCateDTO): Promise<ICategoryRO> {
        const {name} = createCateDTO;

        const category = new Category();
        category.name = name;

        const createdCategory = await this.categoryRepository.save(category);
        return this.buildCategory(createdCategory);
    }
    async updateCategory(id: number, updateCateDTO: UpdateCateDTO): Promise<ICategoryRO> {
        const {name} = updateCateDTO;
        const category = await this.categoryRepository.findOne(id);
        category.name = name;
        await this.categoryRepository.save(category);
        return this.buildCategory(category);
    }

    async deleteCategory(id: number): Promise<boolean> {
        const category = await this.categoryRepository.findOne(id);
        category.deletedAt = new Date();
        await this.categoryRepository.save(category);
        return true;
    }
}
