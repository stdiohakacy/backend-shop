import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { IsString, IsNotEmpty, MaxLength, IsDate, IsEmail, IsOptional } from 'class-validator';
import * as crypto from 'crypto';

@Entity('user')
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    readonly id: number;
    
    @Column()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(150)
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    password: string;

    @Column({nullable: true, default: ''})
    @IsOptional()
    @IsString()
    @MaxLength(50)
    firstName?: string;
    
    @Column({nullable: true, default: ''})
    @IsOptional()
    @IsString()
    @MaxLength(50)
    lastName?: string;

    @Column({nullable: true, default: ''})
    @IsOptional()
    @IsString()
    @MaxLength(250)
    avatar?: string;

    // @BeforeInsert()
    // hashPassword() {
    //     this.password = crypto.createHmac('sha256', this.password).digest('hex');
    // }

    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn({nullable: true, type: 'timestamp'})
    @IsDate()
    updatedAt?: Date;

    @Column({nullable: true, type: 'timestamp'})
    @IsDate()
    deletedAt?: Date;
}
