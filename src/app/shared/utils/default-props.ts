import { IHeader, ITab } from "../models/general.interface";
import { IUser } from "../models/user.interface";

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

export const defaultUser: IUser = {
    id: '0',
    code: '000000',
    name: 'USUARIO', 
    lastname: 'PRUEBA'
}

export const prepareTabs: Array<ITab> = [
    {
        label: 'DISPONIBLE',
        value: 'disponible',
        layout: 'icon-bottom'
    },
    {
        label: 'EN PREPARACIÓN',
        value: 'preparacion',
        layout: 'icon-bottom'
    },
    {
        label: 'PREPARADO',
        value: 'preparado',
        layout: 'icon-bottom'
    }
]