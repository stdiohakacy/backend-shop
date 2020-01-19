import { UpdateProductDTO } from './dto/update-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, IsNull } from 'typeorm';
import { IProductsResultObject } from './product.interface';
import ProductView from './view/product.view';
import DataHelper from 'src/helpers/DataHelper';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async findProducts(): Promise<IProductsResultObject> {
        const [productsRepository, count] = await this.productRepository
            .findAndCount({
                order: {createdAt: 'DESC'}, 
                where: {deletedAt: IsNull()}, 
                relations: ['category'],
            });

        const products = ProductView.transformList(productsRepository);
        return {products, count};
    }

    async findProduct(id: number): Promise<ProductView> {
        const product = await this.productRepository
            .findOne(id, {
                relations: ['category'], 
                where: {deletedAt: IsNull(),
            }});
        return new ProductView(product);
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<ProductView> {
        const {name, price, image, categoryId} = createProductDTO;

        const product = new Product();
        product.name = name;
        product.price = price;
        product.image = image;
        product.categoryId = categoryId;

        const createdProduct = await this.productRepository.save(product);
        return new ProductView(createdProduct);
    }

    async updateProduct(id: number, data: any): Promise<boolean> {
        const product = await this.productRepository.findOne(id);

        const fields = [
            'name',
            'price',
            'image',
        ];

        DataHelper.filterDataInput(product, data, fields);
        await this.productRepository.update(id, product);

        return true;
    }

    async deleteProduct(id: number): Promise<boolean> {
        const product = await this.productRepository.findOne(id);

        product.deletedAt = new Date();
        
        await this.productRepository.save(product);
        return true;
    }
}
