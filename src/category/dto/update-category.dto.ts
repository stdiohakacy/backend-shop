import {IsNotEmpty, IsString} from 'class-validator';

export class UpdateCateDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
