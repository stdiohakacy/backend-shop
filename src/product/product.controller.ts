import { Controller, Get, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
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

    @UsePipes(new ValidationPipe())
    @Post()
    async createProduct(@Body() createProductDTO: CreateProductDTO): Promise<ProductView> {
        return this.productService.createProduct(createProductDTO);
    }
}
