import _ from 'lodash';

export const makePath = (...parts: (string | undefined)[]): string => {
  return `/${_.filter(parts, (p) => !!p)
    .map((p) => _.trim(p, '/'))
    .join('/')}/`.replace(/\/{2,}/g, '/');
};
