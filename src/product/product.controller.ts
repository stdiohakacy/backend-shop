import { Controller, Get, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { IProductsRO, IProductRO } from './product.interface';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findProducts(): Promise<IProductsRO> {
        return await this.productService.findProducts();
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async createProduct(@Body() createProductDTO: CreateProductDTO): Promise<IProductRO> {
        return this.productService.createProduct(createProductDTO);
    }
}
