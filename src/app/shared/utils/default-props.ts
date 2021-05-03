import { IHeader, ITab } from "../models/general.interface";
import { IPackageDetail } from "../models/order.interface";

export const defaultHeader: IHeader = {
    title: 'Título',
    barColor: 'primary',
    hasSubtitle: false,
    back: {
        status: false,
        icon: 'arrow-back'
    },
    extra: {
        status: false,
    }
}

export const prepareTabs: Array<ITab> = [
    {
        label: 'DISPONIBLE',
        value: '1',
        layout: 'icon-bottom'
    },
    {
        label: 'EN PREPARACIÓN',
        value: '2',
        layout: 'icon-bottom'
    },
    {
        label: 'PREPARADO',
        value: '3',
        layout: 'icon-bottom'
    }
]

export const verifyTabs: Array<ITab> = [
    {
        label: 'PREPARADO',
        value: '3',
        layout: 'icon-bottom'
    },
    {
        label: 'EN VERIFICACIÓN',
        value: '4',
        layout: 'icon-bottom'
    },
    {
        label: 'VERIFICADO',
        value: '5',
        layout: 'icon-bottom'
    }
]

export const packageList: Array<IPackageDetail> = 
[
    {
      containerId: 1,
      containerText: "Caja cartón",
      quantity: 0
    },
    {
      containerId: 2,
      containerText: "Bolsa plástica",
      quantity: 0
    },
    {
      containerId: 3,
      containerText: "Caja de galletas",
      quantity: 0
    }
]

export const monitorLabelList: Array<any> = [
    {
        status: '1',
        description: 'D',
        tooltip: 'DISPONIBLE'
    },
    {
        status: '2',
        description: 'EP',
        tooltip: 'EN PREPARACIÓN'
    },
    {
        status: '3',
        description: 'P',
        tooltip: 'PREPARADO'
    },
    {
        status: '4',
        description: 'EV',
        tooltip: 'EN VERIFICACIÓN'
    },
    {
        status: '5',
        description: 'V',
        tooltip: 'VERIFICADO'
    },
    {
        status: '6',
        description: 'EN',
        tooltip: 'ENTREGADO'
    }
]

export const reportHeader: Array<any> = [
    {
        width: 'w-30',
        label: "Código"
    },
    {
        width: 'w-50',
        label: "Producto"
    },
    {
        width: 'w-20',
        label: "Cantidad"
    },
    {
        width: 'w-20',
        label: "Unidad"
    },
]