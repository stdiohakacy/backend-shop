import { HttpException } from '@nestjs/common';

export class ValidationError extends HttpException {
    constructor() {
        super('BAD REQUEST', 400);
        // ValidationError.createBody('id invalid', 'id invalid', 400);
    }
}
