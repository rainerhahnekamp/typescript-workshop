export type Assert<T extends true> = true;
export type IsType<T, U> = T extends U ? (U extends T ? true : false) : false;
