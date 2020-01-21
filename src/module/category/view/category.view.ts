import { Category } from '../../../entities/category.entity';

export default class CategoryView {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(category: Category) {
        this.id = category.id;
        this.name = category.name;
        this.createdAt = category.createdAt;
        this.updatedAt = category.updatedAt;
    }

    static transform(categories: Category[]): CategoryView[] {
        return categories.map(category => new CategoryView(category));
    }
}
