import { IPaginationResult } from './pagination-results.interface';

export class Pagination<PaginationEntity> {
    public results: PaginationEntity[];
    public pageTotal: number;
    public total: number;

    constructor(paginationResult: IPaginationResult<PaginationEntity>) {
        this.results = paginationResult.results;
        this.pageTotal = paginationResult.results.length;
        this.total = paginationResult.total;
    }
}
