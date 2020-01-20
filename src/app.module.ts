import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './module/category/category.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProductController } from './module/product/product.controller';
import { ProductService } from './module/product/product.service';
import { ProductModule } from './module/product/product.module';
import { PaginationModule } from './module/pagination/pagination.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CategoryModule, ProductModule, PaginationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
