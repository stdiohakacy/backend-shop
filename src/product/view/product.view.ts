import { Product } from './../product.entity';
import { Category } from 'src/category/category.entity';
import CategoryReference from 'src/category/view/category.ref';

export default class ProductView {
    id: number;
    name: string;
    price: number;
    image: string;
    createdAt: Date;
    updatedAt?: Date;category: CategoryReference;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.createdAt = product.createdAt;
        this.updatedAt = product.updatedAt;
        this.category = new CategoryReference(product.category);
    }

    static transformList(products: Product[]): ProductView[] {
        return products.map(product => new ProductView(product));
    }
}
