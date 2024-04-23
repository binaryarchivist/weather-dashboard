import _ from 'lodash';

export const makePath = (...parts: (string | undefined)[]): string => {
  const trimmedParts = _.filter(parts, (p) => !!p).map((p) => _.trim(p, '/'));
  return trimmedParts.join('/');
};
