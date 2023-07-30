export interface Visit{
    target: string;
    type: VisitType;
}

export interface GetVisit{
    target?: string;
    type?: VisitType;
}

export interface GetPopularVisit{
    limit: number;
    type: VisitType;
}

export const visitTypes = ['blog', 'Tag', 'Post', 'Category'] as const;
export type VisitType = typeof visitTypes[number];