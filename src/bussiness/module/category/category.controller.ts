import { Controller, Post, Body, Get, Param, Put, Delete, Request, UseInterceptors, CacheInterceptor, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCateDTO } from './dto/create-category.dto';
import CategoryView from './view/category.view';
import { ICategoriesView } from './category.interface';
import { Pagination } from '../pagination/pagination';
import ProductView from '../product/view/product.view';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findCategories(): Promise<ICategoriesView> {
        return await this.categoryService.findCategories();
    }

    @Get('initial')
    async initialProducts(): Promise<any> {
        return await this.categoryService.initialCategories();
    }

    @Get(':id')
    async findCategory(@Param('id') id: number): Promise<CategoryView> {
        return await this.categoryService.findCategory(id);
    }

    @Get(':id/products')
    @UseInterceptors(CacheInterceptor)
    async findProductsByCategory(@Param() id: number, @Query('limit') limit: number, @Query('page') page: number): Promise<Pagination<ProductView>> {
        return await this.categoryService.findProductsByCategory(id, {
            limit: limit ? limit : 10000,
            page: page ? page : 0,
        });
    }

    @Post()
    async createCategory(@Body() createCateDTO: CreateCateDTO): Promise<CategoryView> {
        return await this.categoryService.createCategory(createCateDTO);
    }

    @Put(':id')
    async updateCategory(@Param() id: number, @Body() data: any): Promise<boolean> {
        return await this.categoryService.updateCategory(id, data);
    }

    @Delete(':id')
    async deleteCategory(@Param() id: number): Promise<boolean> {
        return await this.categoryService.deleteCategory(id);
    }
}
