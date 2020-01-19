import CategoryView from './view/category.view';

// export interface ICategoryData {
//     name: string;
//     createdAt?: Date;
//     updatedAt?: Date;
// }
export interface ICategoryResultObject {
    category: CategoryView;
}
export interface ICategoriesResultObject {
    categories: CategoryView[];
    count: number;
}
