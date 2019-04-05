import { resolve as _resolve } from 'path';

export const resolve = ($path) => {
    return _resolve(__dirname, `../${$path}`);
}