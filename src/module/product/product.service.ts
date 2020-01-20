import { CreateProductDTO } from './dto/create-product.dto';
import { Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository, IsNull } from 'typeorm';
import ProductView from './view/product.view';
import DataHelper from 'src/helpers/DataHelper';
import * as faker from 'faker';
import { Pagination } from '../pagination/pagination';
import { IPaginationOptions } from '../pagination/pagination-options.interface';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async findProducts(options: IPaginationOptions): Promise<Pagination<ProductView>> {
        const [products, total] = await this.productRepository.findAndCount({
            order: {createdAt: 'DESC'},
            where: {deletedAt: IsNull()},
            take: options.limit,
            skip: options.page * options.limit,
        });

        const data = ProductView.transformList(products);

        return new Pagination<ProductView>({ data, total });
    }
    
    async initialProducts(): Promise<any> {
        for (let index = 0; index < 50; index++) {
            const fakerInstance = {
                name: faker.commerce.productName(),
                price: Math.floor(Math.random() * 10000000) + 1000, 
                image: faker.image.imageUrl(), 
                categoryId: 1,
            };
            this.createProduct(fakerInstance);
        }
    }

    async findProduct(id: number): Promise<ProductView> {
        const product = await this.productRepository.findOne(id);

        if (!product.deletedAt) {
            return new ProductView(product);
        }
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
