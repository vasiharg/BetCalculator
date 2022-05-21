export const toFixed = (num: number, decimals: number = 2): number => {
    let numToStr = num.toString();
    return Number(numToStr.slice(0, (numToStr.indexOf(".")) + decimals + 1));
}