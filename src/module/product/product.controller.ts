import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Param, Put, Delete, Request, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import ProductView from './view/product.view';
import { Pagination } from '../pagination/pagination';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findProducts(@Request() request: any): Promise<Pagination<ProductView>> {
        return await this.productService.findProducts({
            limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
            page: request.query.hasOwnProperty('page') ? request.query.page : 0,
        });
    }

    @Get('/initial')
    async initialProducts(): Promise<any> {
        return await this.productService.initialProducts();
    }

    @Get('/:id')
    async findProduct(@Param() id: number): Promise<ProductView> {
        return await this.productService.findProduct(id);
    }

    @Post()
    async createProduct(@Body() createProductDTO: CreateProductDTO): Promise<ProductView> {
        return await this.productService.createProduct(createProductDTO);
    }

    @Put('/:id')
    async updateProduct(@Param() id: number, @Body() data: any): Promise<boolean> {
        return await this.productService.updateProduct(id, data);
    }

    @Delete('/:id')
    async deleteCategory(@Param() id: number): Promise<boolean> {
        return await this.productService.deleteProduct(id);
    }
}
