import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsNotEmpty, MaxLength, IsInt, Min, Max } from 'class-validator';
import { Category } from 'src/category/category.entity';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    name: string;

    @Column()
    @IsInt()
    @Min(1000)
    @Max(10000000)
    price: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    image: string;

    @ManyToOne(type => Category, category => category.products)
    category: Category;

    @Column()
    @IsInt()
    categoryId: number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({nullable: true, type: 'timestamp'})
    deletedAt: Date;
}
