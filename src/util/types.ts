export type Optional<R extends Record<string | number | symbol, unknown>> = {
    [key in keyof R]?: R[key];
};
