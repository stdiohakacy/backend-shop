import { Product } from 'src/bussiness/entities/product.entity';

export default class ProductView {
    id: number;
    name: string;
    price: number;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.createdAt = product.createdAt;
        this.updatedAt = product.updatedAt;
    }

    static transform(products: Product[]): ProductView[] {
        return products.map(product => new ProductView(product));
    }
}
