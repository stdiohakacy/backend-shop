import { CreateCateDTO } from './dto/create-category.dto';
import { CategoryEntity } from './category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryRO } from './category.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    private buildCategory(categoryEntity: CategoryEntity) {
        const buildedCategory = {
            name: categoryEntity.name,
        };
        return {category: buildedCategory};
    }

    async createCategory(createCateDTO: CreateCateDTO): Promise<CategoryRO> {
        const {name} = createCateDTO;

        const category = new CategoryEntity();
        category.name = name;

        const createdCategory = await this.categoryRepository.save(category);
        return this.buildCategory(createdCategory);
    }
}
