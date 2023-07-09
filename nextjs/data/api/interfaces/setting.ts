export interface CategoriesCreate{
    categories: Array<string>
}

export interface SettingUpdate{
    _id: string
    type?: string
    role?: string;
    userId?: string
    name?: string;
    value?: string;
    createAt?: Date;
    updateAt?: Date;
}

export interface SettingCreate{
    type: string
    name: string;
    value: string;
}