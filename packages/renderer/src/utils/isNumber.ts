export const isNumber = (str: string): boolean => {
    if (typeof str !== 'string') {
        return false;
    }
    return /^(0|([1-9]\d*))(\.\d+)?$/.test(str.trim());

}