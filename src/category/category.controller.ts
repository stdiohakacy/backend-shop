import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCateDTO } from './dto/create-category.dto';
import { CategoryRO, CategoriesRO } from './category.interface';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findCategories(): Promise<CategoriesRO> {
        return await this.categoryService.findCategories();
    }

    @Post()
    async createCategory(@Body() createCateDTO: CreateCateDTO): Promise<CategoryRO> {
        return await this.categoryService.createCategory(createCateDTO);
    }
}
