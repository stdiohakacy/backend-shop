import { Module, CacheModule } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { Product } from 'src/entities/product.entity';

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
