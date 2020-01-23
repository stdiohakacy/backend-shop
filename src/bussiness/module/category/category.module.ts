import { Module, CacheModule } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/bussiness/entities/product.entity';
import { Category } from 'src/bussiness/entities/category.entity';

@Module({
    imports: [
        CacheModule.register(),
        TypeOrmModule.forFeature([Category, Product]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
