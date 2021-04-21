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
