export default class DataHelper {
    static filterDataInput<T>(entity: T, data: any, fields?: string[]): T {
        if (entity && typeof entity === 'object' && data && typeof data === 'object' && fields && Array.isArray(fields)) {
            for (let i = 0; i < fields.length; i++) {
                if (data.hasOwnProperty(fields[i]) && data[fields[i]] !== undefined)
                    entity[fields[i]] = data[fields[i]];
            }
        }
        return entity;
    }
}
