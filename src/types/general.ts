export type Nil = null | undefined;
export type NonNil<T> = T extends Nil ? never : T;
export type Nillable<T> = T | Nil;