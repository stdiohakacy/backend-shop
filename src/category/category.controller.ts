import { Controller, Post, Body, Get, UsePipes, Param, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCateDTO } from './dto/create-category.dto';
import { ICategoryRO, ICategoriesRO } from './category.interface';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { UpdateCateDTO } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findCategories(): Promise<ICategoriesRO> {
        return await this.categoryService.findCategories();
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async createCategory(@Body() createCateDTO: CreateCateDTO): Promise<ICategoryRO> {
        return await this.categoryService.createCategory(createCateDTO);
    }

    @UsePipes(new ValidationPipe())
    @Put('/:id')
    async updateCategory(@Param() id: number, @Body() updateCateDTO: UpdateCateDTO): Promise<ICategoryRO> {
        return await this.categoryService.updateCategory(id, updateCateDTO);
    }
}
