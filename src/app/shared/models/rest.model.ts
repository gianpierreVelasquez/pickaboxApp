const hasValue = (v: any): boolean => v !== undefined && v !== null && v !== '';

function removeUndefinedFromObj(obj: any): any {
    const arrObjKeys = Object.keys(obj);

    return arrObjKeys.reduce((acc, k) => hasValue(obj[k]) ? { ...acc, [k]: obj[k] } : acc, {});
}

export class ReqQueryGetOrders {
    public deliveryPersonId: string;
    public status: string;

    public static create(obj): ReqQueryGetOrders {
        return removeUndefinedFromObj({
            deliveryPersonId: hasValue(obj.deliveryPersonId) ? '' + obj.deliveryPersonId : undefined,
            status: hasValue(obj.status) ? '' + obj.status : undefined
        });
    }
}

export class ReqBodyUpdateOrderStatus {
    public id: string;
    public status: string;

    public static create(obj): ReqBodyUpdateOrderStatus {
        return removeUndefinedFromObj({
            id: hasValue(obj.id) ? '' + obj.id : undefined,
            status: hasValue(obj.status) ? '' + obj.status : undefined
        });
    }
}