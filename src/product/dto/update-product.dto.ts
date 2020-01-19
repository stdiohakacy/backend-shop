import {IsNotEmpty, IsString, MaxLength, IsInt, Min, Max} from 'class-validator';

export class UpdateProductDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    readonly name: string;

    @IsInt()
    @Min(1000)
    @Max(10000000)
    readonly price: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    readonly image: string;
}
