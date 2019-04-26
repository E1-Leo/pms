function parseTime(timestamp, fmt) {
    let d = new Date(timestamp),
        f = fmt || 'yyyy-MM-dd hh:mm:ss',
        o = {
            'M+': d.getMonth() + 1, //月份
            'd+': d.getDate(), //日
            'h+': d.getHours(), //小时
            'm+': d.getMinutes(), //分
            's+': d.getSeconds(), //秒
            'q+': Math.floor((d.getMonth() + 3) / 3), //季度
            'S': d.getMilliseconds() //毫秒
        };
    if (/(y+)/.test(f)) {
        f = f.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(f)) {
            f = f.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return f;
}

module.exports = {
    parseTime
}