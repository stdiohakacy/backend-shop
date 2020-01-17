export interface ICategoryData {
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICategoryRO {
    category: ICategoryData;
}

export interface ICategoriesRO {
    categories: ICategoryData[];
    count: number;
}
