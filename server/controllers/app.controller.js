const path = require('path');
const appCtrl = {};

appCtrl.home = async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}

module.exports = { appCtrl };