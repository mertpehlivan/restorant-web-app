const UserRepository = require("../repositories/UserRepository");


const getuser = async (req, res) => {
    const email = req.email;
    try {
        const user = await UserRepository.findUserByEmail(email);
        if (user) {
            res.status(200).json({ data: user[0] });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getuser
};
