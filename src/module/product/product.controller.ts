import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Param, Put, Delete, Request } from '@nestjs/common';
import { IProductsView} from './product.interface';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import ProductView from './view/product.view';
import { Pagination } from '../pagination/pagination';
import { Product } from 'src/entities/product.entity';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    // @Get()
    // async findProducts(): Promise<IProductsView> {
    //     return await this.productService.findProducts();
    // }

    @Get()
    async findProducts(@Request() request): Promise<Pagination<ProductView>> {
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

    @UsePipes(new ValidationPipe())
    @Post()
    async createProduct(@Body() createProductDTO: CreateProductDTO): Promise<ProductView> {
        return this.productService.createProduct(createProductDTO);
    }

    @UsePipes(new ValidationPipe())
    @Put('/:id')
    async updateProduct(@Param() id: number, @Body() data: any): Promise<boolean> {
        return await this.productService.updateProduct(id, data);
    }

    @Delete('/:id')
    async deleteCategory(@Param() id: number): Promise<boolean> {
        return await this.productService.deleteProduct(id);
    }
}
