import { IOrderDetail, IPackageDetail } from "./order.interface";

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

export class ReqBodyUpdateOrderStatusInit {
    public id: string;
    public status: string;

    public static create(obj): ReqBodyUpdateOrderStatusInit {
        return removeUndefinedFromObj({
            id: hasValue(obj.id) ? '' + obj.id : undefined,
            status: hasValue(obj.status) ? '' + obj.status : undefined
        });
    }
}

export class ReqBodyUpdateOrderStatusMiddle {
    public id: string;
    public status: string;
    public code: string;
    public username: string;
    public start: number;
    public end: number;

    public static create(obj): ReqBodyUpdateOrderStatusMiddle {
        return removeUndefinedFromObj({
            id: hasValue(obj.id) ? '' + obj.id : undefined,
            status: hasValue(obj.status) ? '' + obj.status : undefined,
            code: hasValue(obj.code) ? '' + obj.code : undefined,
            username: hasValue(obj.username) ? '' + obj.username : undefined,
            start: hasValue(obj.start) ? obj.start : undefined,
            end: hasValue(obj.end) ? obj.end : undefined
        });
    }
}

export class ReqBodyUpdateOrderDetail {
    public id: string;
    public detail: IOrderDetail[];

    public static create(obj): ReqBodyUpdateOrderDetail {
        return removeUndefinedFromObj({
            id: hasValue(obj.id) ? '' + obj.id : undefined,
            detail: hasValue(obj.detail) ? obj.detail : undefined
        });
    }
}

export class ReqBodyPostPackagesToGetQR {
    public id: string;
    public labels: IPackageDetail[];

    public static create(obj): ReqBodyUpdateOrderStatusInit {
        return removeUndefinedFromObj({
            id: hasValue(obj.id) ? '' + obj.id : undefined,
            labels: hasValue(obj.labels) ? obj.labels : undefined
        });
    }
}

export class ReqQueryGetMonitor {
    public deliveryDate: string;

    public static create(obj): ReqQueryGetMonitor {
        return removeUndefinedFromObj({
            deliveryDate: hasValue(obj.deliveryDate) ? '' + obj.deliveryDate : undefined
        });
    }
}