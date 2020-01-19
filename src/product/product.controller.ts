import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Param, Put, Delete } from '@nestjs/common';
import { IProductsResultObject} from './product.interface';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import ProductView from './view/product.view';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findProducts(): Promise<IProductsResultObject> {
        return await this.productService.findProducts();
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
