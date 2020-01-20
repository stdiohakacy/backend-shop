export interface IPaginationResult<PaginationEntity> {
    results: PaginationEntity[];
    total: number;
    next?: string;
    previous?: string;
}
