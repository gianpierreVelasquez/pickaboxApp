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
    href?: string;
    status: boolean;
}

export interface OptionProps {
    id: string;
    src: string;
    title: string;
}