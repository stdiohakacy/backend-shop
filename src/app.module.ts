import { Module, CacheModule, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './module/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProductModule } from './module/product/product.module';
import { PaginationModule } from './module/pagination/pagination.module';
import { ConfigModule } from '@nestjs/config';
// import { UserModule } from './module/user/user.module';
import * as ormconfig from './ormconfig';

export function DatabaseOrmModule(): DynamicModule {
  // we could load the configuration from dotEnv here,
  // but typeORM cli would not be able to find the configuration file.
  return TypeOrmModule.forRoot(ormconfig);
}

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(ormconfig), 
        CategoryModule, 
        ProductModule, 
        PaginationModule, 
        // UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
