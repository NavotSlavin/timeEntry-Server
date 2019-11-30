fetch = require('node-fetch')


fetch('http://127.0.0.1:3000/admin/users')
    .then(res => res.text())
    .then((txt) => {
        obj = JSON.parse(txt);
        console.log(`num of users expected to be 4, num of users = ${obj.length}`)
    });

fetch(`http://127.0.0.1:3000/admin/purchases`)
    .then(res => res.text())
    .then((text) => {
        obj = JSON.parse(text);
        console.log(`num of purchases expected to be 6, num of purchases = ${obj.length}`)
});

fetch(`http://localhost:3000/shuzi/cart/?id=5d28b13ac60ecee87d0e1685`)
    .then(res => res.text())
    .then((text) => {
        console.log("check cookie: expeted to be invalid cookie, result is:" + text)
});
