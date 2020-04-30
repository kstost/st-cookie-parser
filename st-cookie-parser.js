module.exports = {
    stringify(obj) {
        try {
            let newlist = [];
            Object.keys(obj).forEach(key => {
                let value = obj[key];
                if (key.toLowerCase() === 'expires') {
                    let date = new Date();
                    date.setTime(value * 1000);
                    value = date.toGMTString();
                }
                let addval;
                if (typeof value === 'boolean') {
                    if (value) {
                        addval = key;
                    }
                } else {
                    addval = key + '=' + value;
                }
                if (addval) {
                    newlist.push(addval);
                }
            });
            return newlist.join('; ');
        } catch (e) {
            return '';
        }
    },
    expire_time(obj) {
        try {
            let od = {};
            od['max-age'] = -1;
            od['expires'] = -1;
            Object.keys(obj).forEach(key => {
                od[key.toLowerCase()] = obj[key];
            });
            if (od['max-age'] > -1) {
                return od['max-age'];
            }
            if (od['expires'] > -1) {
                return od['expires'];
            }
        } catch (e) { }
        return -1;
    },
    parse(cookie) {
        let obj = {};
        try {
            cookie.split('; ').map(item => item.split('=')).forEach(couple => {
                let key = couple[0].trim();
                let value = couple[1];
                if (key) {
                    if (key.toLowerCase() === 'expires') {
                        value = new Date(value).getTime() / 1000;
                    }
                    if (key.toLowerCase() === 'max-age') {
                        let number = Number(value);
                        value = isNaN(number) ? value : number;
                    }
                    if (isNaN(value)) {
                        value = couple[1];
                    }
                    obj[key] = couple[1] ? value : true;
                }
            });
        } catch (e) { }
        return obj;
    }
}
