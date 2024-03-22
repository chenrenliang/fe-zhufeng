const express = require('express');
const path = require('path')
let app = express();
app.use('/', express.static(path.join(__dirname, 'public')));
app.listen(80, () => {
    console.log('server started at 80');
});
