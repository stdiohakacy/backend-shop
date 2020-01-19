import { Controller, Post, Body, Get, UsePipes, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCateDTO } from './dto/create-category.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { UpdateCateDTO } from './dto/update-category.dto';
import CategoryView from './view/category.view';
import { ICategoriesResultObject } from './category.interface';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findCategories(): Promise<ICategoriesResultObject> {
        return await this.categoryService.findCategories();
    }

    @Get('/:id')
    async findCategory(@Param() id: number): Promise<CategoryView> {
        return await this.categoryService.findCategory(id);
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async createCategory(@Body() createCateDTO: CreateCateDTO): Promise<CategoryView> {
        return await this.categoryService.createCategory(createCateDTO);
    }

    @UsePipes(new ValidationPipe())
    @Put('/:id')
    async updateCategory(@Param() id: number, @Body() updateCateDTO: UpdateCateDTO): Promise<CategoryView> {
        return await this.categoryService.updateCategory(id, updateCateDTO);
    }

    @Delete('/:id')
    async deleteCategory(@Param() id: number): Promise<boolean> {
        return await this.categoryService.deleteCategory(id);
    }
}
