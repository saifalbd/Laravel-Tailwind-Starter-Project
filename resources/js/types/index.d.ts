export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar_id:number
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    currentRouteName:string;
    auth: {
        user: User;
    };
};
