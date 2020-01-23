import { Category } from 'src/bussiness/entities/category.entity';

export default class CategoryReference {
    id: number;
    name: string;

    constructor(category: Category) {
        this.id = category.id;
        this.name = category.name;
    }
}
