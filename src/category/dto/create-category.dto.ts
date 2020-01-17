import {IsNotEmpty, IsString} from 'class-validator';

export class CreateCateDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
