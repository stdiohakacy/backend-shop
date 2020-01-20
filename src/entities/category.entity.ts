import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from 'typeorm';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Product } from 'src/entities/product.entity';

@Entity('category')
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
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    @Column({nullable: true, type: 'timestamp'})
    deletedAt: Date;

}
