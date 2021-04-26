export interface IRoute {
    id: string,
    businessName: string,
    responsableName: string,
    contactEmail: string,
    deliveryPersonId: string
}

export interface IOrder {
	customerName: string;
	dc: string;
	deliveryDate: string;
	orderId: string;
	status: string;
	salesPersonName: string;
	orderDate: string;
	poNumber: string;
	orderNumber: string;
	orderType: string;
	userId: string;
	deliveryPersonId: string;
	username: string;
	salesPersonId: string;
	id: string;
	customerAddress: string;
	customerId: string;
	preferredDate: string;
	updateTime: number;
    detail: IOrderDetail[];
}

export interface IOrderDetail {
	quantity: number;
	orderId: string;
	m3: number;
	measureUnit: string;
	verifiedQ: number;
	deliveryPersonId: string;
	materialId: string;
	deliveredQ: number;
	materialText: string;
	position: number;
	deliveryDate: string;
	pickedQ: number;
	dc: string;
}

export interface IPackageManagement {
	id: string;
	labels: IPackageDetail[];
}

export interface IPackageDetail {
	containerId: number;
	containerText: string;
	quantity: number;
}

export interface IPrepareManagment {
	id: string;
	detail: IPrepareDetail[];
}

export interface IPrepareDetail {
	position: number;
	pickedQ: number;
	verifiedQ: number;
	deliveredQ: number;
}

export interface IQr {
	qrCode: string;
}