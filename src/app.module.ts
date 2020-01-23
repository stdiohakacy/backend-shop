import { ConfigModule } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { CategoryModule } from './bussiness/module/category/category.module';
import { ProductModule } from './bussiness/module/product/product.module';
import { PaginationModule } from './bussiness/module/pagination/pagination.module';
import { UserModule } from './bussiness/module/user/user.module';
import { AuthModule } from './bussiness/module/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';

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
        UserModule, 
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
