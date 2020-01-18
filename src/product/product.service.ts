import { CreateProductDTO } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, IsNull } from 'typeorm';
import { IProductsRO, IProductRO } from './product.interface';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    private buildProduct(product: Product) {
        const buildedProduct = {
            name: product.name,
            price: product.price,
            image: product.image,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
        return {product: buildedProduct};
    }

    private buildProducts(products: Product[]) {
        const builedProducts = [];
        for (const product of products) {
            const data = this.buildProduct(product);
            builedProducts.push(data);
        }
        return builedProducts;
    }

    async findProducts(): Promise<IProductsRO> {
        const [products, count] = await this.productRepository.findAndCount({order: {createdAt: 'DESC'}, where: {deletedAt: IsNull()}});

        const builedProducts = this.buildProducts(products);
        return {products: builedProducts, count};
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<IProductRO> {
        const {name, price, image, categoryId} = createProductDTO;

        const product = new Product();
        product.name = name;
        product.price = price;
        product.image = image;
        product.categoryId = categoryId;

        const createdProduct = await this.productRepository.save(product);

        return this.buildProduct(createdProduct);
    }
}
