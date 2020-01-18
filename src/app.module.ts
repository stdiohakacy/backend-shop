import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CategoryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
