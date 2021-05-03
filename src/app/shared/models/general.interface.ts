export interface IHeader {
    title: string;
    barColor?: string;
    hasSubtitle: boolean;
    subtitle?: string;
    subtext?: string;
    back: BackProps;
    extra: HeaderExtra;
}

export interface HeaderExtra {
    text?: string;
    icon?: string;
    status: boolean;
}

export interface BackProps {
    text?: string;
    icon?: string;
    back?: boolean;
    routeBack?: string;
    action?: boolean;
    status: boolean;
}

export interface OptionProps {
    id: string;
    src: string;
    title: string;
    route: string;
    type: string;
}

export interface ITab {
    label: string;
    value: string;
    span?: string;
    icon?: string;
    layout: string;
}

export interface ILoader {
    spinner?: any;
}

export interface IColSupport {
    label: string;
    data: any;
    type: string;
}