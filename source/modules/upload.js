const {resolve} = require('path');
const {static} = require('express');
const uploads = resolve(__dirname,'../../uploads');
module.exports = static(uploads);