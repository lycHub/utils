/*
* 是否IE
* */

function isIE() {
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return true;
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        const rv = ua.indexOf('rv:');
        return true;
    }

    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return true;
    }

    // other browser
    return false;
}


/*
* 获取浏览器信息
* */
function getBrowser() {
    const browser = {};
    const matched = this.resolveUserAgent();

    if (matched.browser) {
        browser[matched.browser] = true;
        browser['version'] = matched.version;
    }

    if (browser['chrome']) {
        browser['webkit'] = true;
    } else if (browser['webkit']) {
        browser['safari'] = true;
    }
    return browser;
}

function resolveUserAgent() {
    let ua = navigator.userAgent.toLowerCase();
    let match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
        [];

    return {
        browser: match[1] || '',
        version: match[2] || 0
    };
}