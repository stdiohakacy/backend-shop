import { CreateProductDTO } from './dto/create-product.dto';
import { Injectable, NotFoundException, UnprocessableEntityException, Inject, CACHE_MANAGER, InternalServerErrorException, CacheModule} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository, IsNull, getRepository } from 'typeorm';
import ProductView from './view/product.view';
import DataHelper from 'src/helpers/DataHelper';
import { Pagination } from '../pagination/pagination';
import { IPaginationOptions } from '../pagination/pagination-options.interface';
import * as faker from 'faker';
@Injectable()
export class ProductService {
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
        const {name, price, image, categoryId} = createProductDTO;

        const product = new Product();
        product.name = name;
        product.price = price;
        product.image = image;
        product.categoryId = categoryId;

        const createdProduct = await this.productRepository.save(product);

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
