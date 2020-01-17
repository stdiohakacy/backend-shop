export interface CategoryData {
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CategoryRO {
    category: CategoryData;
}

export interface CategoriesRO {
    categories: CategoryData[];
    count: number;
}
