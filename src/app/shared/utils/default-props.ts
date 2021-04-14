import { IHeader } from "../models/general.interface";

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