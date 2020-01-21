import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from 'typeorm';
import { IsString, IsNotEmpty, MaxLength, IsDate } from 'class-validator';
import { Product } from 'src/entities/product.entity';

@Entity('category')
@Unique(['name'])
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    name: string;

    @OneToMany(type => Product, product => product.category)
    products: Product[];
    
    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    @IsDate()
    updatedAt: Date;

    @Column({nullable: true, type: 'timestamp'})
    @IsDate()
    deletedAt: Date;
}
