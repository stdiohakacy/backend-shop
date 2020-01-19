import { Category } from '../category.entity';

export default class CategoryView {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt;

    constructor(category: Category) {
        this.id = category.id;
        this.name = category.name;
        this.createdAt = category.createdAt;
        this.updatedAt = category.updatedAt;
    }

    static transformList(categories: Category[]): CategoryView[] {
        return categories.map(category => new CategoryView(category));
    }

    static transformEntity(category: Category): CategoryView {
        return new CategoryView(category);
    }
}
