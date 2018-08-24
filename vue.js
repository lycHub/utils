function isUndef (v) {
    // return v == null;
    return v === undefined || v === null
}

function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

// 转为字符串
function toString (val) {
    return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)
}

// 转为数字
function toNumber (val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
}


// 删除数组项
function remove (arr, item) {
    if (arr.length) {
        var index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}


/**
 * Check whether the object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
}


// 首字母大写
var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
});


/**
 * 合并选项
 */
function extend (to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to
}


/**
 * 将对象数组中的每一项合并成单个对象
 */
function toObject (arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res
}