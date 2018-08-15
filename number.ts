/*
* 是否为整数
* */

function isInteger(value): boolean {
    if(Number.isInteger) {
        return Number.isInteger(value);
    }
    else {
        return typeof value === "number" && isFinite(value) &&  Math.floor(value) === value;
    }
}