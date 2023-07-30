import exp from "constants";

export interface CategoryGetList{
    limit: number;
    offset: number;
}

export interface CategoryCreate{
    name: string;
}

export interface CategoryUpdate{
    _id: string
    name: string;
}

export interface CategoryDelete{
    _id: string
}