import { IPaginationResult } from './pagination-results.interface';

export class Pagination<T> {
    public data: T[];
    public pageTotal: number;
    public total: number;

    constructor(paginationResult: IPaginationResult<T>) {
        this.data = paginationResult.data;
        this.pageTotal = paginationResult.data.length;
        this.total = paginationResult.total;
    }
}
