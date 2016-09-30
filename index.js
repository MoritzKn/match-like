'use strict';

module.exports = function match(value, checks) {
    if (!checks) {
        return;
    }

    if (typeof checks.length !== 'number') {
        throw new Error('The second argument has to be an array of checks');
    }

    for (let i = 0; i < checks.length; i += 1) {
        if (!Array.isArray(checks[i])) {
            throw new Error('Every checks has to be an array');
        }

        let func = checks[i].pop();

        if (typeof func !== 'function') {
            throw new Error('The last element in the case array has to be a function');
        }

        let variants = checks[i];
        let index = variants.indexOf(value);

        if (index !== -1 || variants.length === 0) {
            return func(variants[index], index, variants);
        }
    }
};
