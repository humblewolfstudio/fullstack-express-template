const apiCtrl = {};

apiCtrl.test = async (req, res) => {
    res.status(200).json("Correct");
}

module.exports = { apiCtrl };