import { Controller, Post, Body, Get, UsePipes, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCateDTO } from './dto/create-category.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import CategoryView from './view/category.view';
import { ICategoriesView } from './category.interface';
import { IProductsView } from 'src/product/product.interface';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findCategories(): Promise<ICategoriesView> {
        return await this.categoryService.findCategories();
    }

    @Get('/:id')
    async findCategory(@Param() id: number): Promise<CategoryView> {
        return await this.categoryService.findCategory(id);
    }

    @Get('/:id/products')
    async findProductsByCategory(@Param() id: number): Promise<IProductsView> {
        return await this.categoryService.findProductsByCategory(id);
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async createCategory(@Body() createCateDTO: CreateCateDTO): Promise<CategoryView> {
        return await this.categoryService.createCategory(createCateDTO);
    }

    @UsePipes(new ValidationPipe())
    @Put('/:id')
    async updateCategory(@Param() id: number, @Body() data: any): Promise<boolean> {
        return await this.categoryService.updateCategory(id, data);
    }

    @Delete('/:id')
    async deleteCategory(@Param() id: number): Promise<boolean> {
        return await this.categoryService.deleteCategory(id);
    }
}
