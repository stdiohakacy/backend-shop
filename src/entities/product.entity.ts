import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, JoinColumn, Unique } from 'typeorm';
import { IsString, IsNotEmpty, MaxLength, IsInt, Min, Max } from 'class-validator';
import { Category } from 'src/entities/category.entity';

@Entity('product')
@Unique(['name'])
export class Product {
    @PrimaryGeneratedColumn()
    readonly id: number;

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
    @JoinColumn({referencedColumnName: 'id'})
    category: Category;

    @IsInt()
    categoryId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    @Column({nullable: true, type: 'timestamp'})
    deletedAt: Date;
}
