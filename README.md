```js
let cc = require("./st-cookie-parser")
let sample = "id=1234; Max-Age=3600; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; Path=/; HttpOnly";
let parsed = cc.parse(sample);
console.log(cc.stringify(parsed));
```