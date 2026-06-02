const Account = require('../models/Account');
const createAccount = async (req, res) => {
    try {
        const account = await Account.create({
            user: req.user._id
        });
        res.status(201).json({ account });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
module.exports = createAccount;