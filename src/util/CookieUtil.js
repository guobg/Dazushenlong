const ACCESS_TOKEN = 'access_token';

export function setCookie(c_name, value, expireDays = 30) {
    let exDate = new Date();
    exDate.setDate(exDate.getDate() + expireDays);
    document.cookie = c_name + "=" + escape(value) +
        ((expireDays === null || expireDays === undefined) ? "" : ";expires=" + exDate.toGMTString())
        + ";path=/";
}

export function setAccessCookie(value) {
    setCookie(ACCESS_TOKEN, value);
}

export function getCookie(c_name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

export function getAccessCookie() {
    return getCookie(ACCESS_TOKEN);
}