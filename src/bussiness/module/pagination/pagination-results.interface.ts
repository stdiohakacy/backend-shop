export interface IPaginationResult<T> {
    data: T[];
    total: number;
    next?: string;
    previous?: string;
}
