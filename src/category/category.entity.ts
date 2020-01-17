import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    @Column({nullable: true, type: 'timestamp'})
    deletedAt: Date;
}
