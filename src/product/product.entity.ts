import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    name: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({nullable: true, type: 'timestamp'})
    deletedAt: Date;
}
