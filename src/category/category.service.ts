import { CategoryData } from './category.interface';
import { CreateCateDTO } from './dto/create-category.dto';
import { CategoryEntity } from './category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CategoryRO, CategoriesRO } from './category.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    private buildCategory(categoryEntity: CategoryEntity) {
        const buildedCategory = {
            name: categoryEntity.name,
            createdAt: categoryEntity.createdAt,
            updatedAt: categoryEntity.updatedAt,
        };
        return {category: buildedCategory};
    }

    private buildCategories(categoriesEntity: CategoryEntity[]) {
        const builedCategories = [];
        for (const categoryEntity of categoriesEntity) {
            const data = this.buildCategory(categoryEntity);
            builedCategories.push(data);
        }
        return builedCategories;
    }

    async createCategory(createCateDTO: CreateCateDTO): Promise<CategoryRO> {
        const {name} = createCateDTO;

        const category = new CategoryEntity();
        category.name = name;

        const createdCategory = await this.categoryRepository.save(category);
        return this.buildCategory(createdCategory);
    }

    async findCategories(): Promise<CategoriesRO> {
        const query = await getRepository(CategoryEntity).createQueryBuilder('category');

        query.orderBy('createdAt', 'DESC');

        const count = await query.getCount();
        const categories = await query.getMany();
        const buildedCategories = this.buildCategories(categories);

        return {categories: buildedCategories, count};
    }
}
