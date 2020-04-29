module.exports = {
    stringify(obj) {
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
    },
    parse(cookie) {
        let obj = {};
        cookie.split('; ').map(item => item.split('=')).forEach(couple => {
            let key = couple[0];
            let value = couple[1];
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
        })
        return obj;
    }
}