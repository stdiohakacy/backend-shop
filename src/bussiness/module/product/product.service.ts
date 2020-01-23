import { CreateProductDTO } from './dto/create-product.dto';
import { Injectable, NotFoundException, UnprocessableEntityException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, getRepository } from 'typeorm';
import ProductView from './view/product.view';
import DataHelper from 'src/helpers/DataHelper';
import { Pagination } from '../pagination/pagination';
import { IPaginationOptions } from '../pagination/pagination-options.interface';
import { Product } from 'src/bussiness/entities/product.entity';
import * as faker from 'faker';
import { IProductService } from 'src/bussiness/services/IProductService';
@Injectable()
export class ProductService implements IProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async findProducts(options: IPaginationOptions): Promise<Pagination<ProductView>> {
            const [products, total] = await this.productRepository.findAndCount({
                order: {createdAt: 'DESC'},
                where: {deletedAt: IsNull()},
                take: options.limit,
                skip: options.page * options.limit,
            });
    
            if (!products) {
                throw new NotFoundException();
            }
    
            const data = ProductView.transform(products);
            return new Pagination<ProductView>({ data, total });
    }
    
    async initialProducts(): Promise<any> {
        for (let index = 0; index < 10000; index++) {
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
        const product = await getRepository(Product)
            .createQueryBuilder('product')
            .whereInIds([id])
            .andWhere('product.deletedAt IS NULL')
            .getOne();

        if (!product) {
            throw new NotFoundException();
        }

        return new ProductView(product);
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<ProductView> {
        const findedProduct = this.productRepository.findOne({where: createProductDTO.name});
        if (findedProduct) {
            throw new ConflictException();
        }

        const product = new Product();
        product.name = createProductDTO.name;
        product.price = createProductDTO.price;
        product.image = createProductDTO.image;
        product.categoryId = createProductDTO.categoryId;

        const createdProduct = await this.productRepository.save(createProductDTO);

        if (!createdProduct) {
            throw new UnprocessableEntityException();
        }
        return new ProductView(createdProduct);
    }

    async updateProduct(id: number, data: any): Promise<boolean> {
        const product = await this.productRepository.findOne(id);

        if (!product) {
            throw new NotFoundException();
        }

        const fields = [
            'name',
            'price',
            'image',
        ];

        DataHelper.filterDataInput(product, data, fields);
        const updatedProduct = await this.productRepository.update(id, product);

        if (!updatedProduct) {
            throw new UnprocessableEntityException();
        }
        return true;
    }

    async deleteProduct(id: number): Promise<boolean> {
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new NotFoundException();
        }
        
        product.deletedAt = new Date();
        const deletedProduct = await this.productRepository.save(product);
        if (!deletedProduct) {
            throw new UnprocessableEntityException();
        }
        return true;
    }
}
