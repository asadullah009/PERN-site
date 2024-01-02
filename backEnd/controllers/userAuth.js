const prisma = require('../DB/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create User
const UserRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(403).json({
                message: 'empty email or password'
            });
        }

        const findUser = await prisma.UserAuth.findUnique({
            where:
            {
                email: email
            }
        })

        if (findUser) {
            return res.status(403).json({
                message: 'User Already Registered'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.UserAuth.create({

            data: {
                email: email,
                name: name,
                password: hashedPassword
            }
        })

        return res.status(200).json({
            data: newUser,
            message: 'User Registered'
        });
    } catch (error) {
        res.status(200).json({
            message: " ERROR"
        });
    }

}

// Login User
const UserLogin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(403).json({
                message: 'empty email or password'
            });
        }

        const user = await prisma.UserAuth.findUnique({
            where:
            {
                email: email
            }
        })

        if (!user) {
            return res.status(403).json({
                message: 'User not Found'
            });
        }

        // Check Password
        const isPassMatch = await bcrypt.compare(password, user.password)
        if (!isPassMatch) {
            return res.status(403)
                .json({ message: "Auth failed username/password incorrect" });
        }


        const userObject = {
            email,
            name: user.name,
            _id: user._id
        }
        const jwtToken = jwt.sign(userObject,
            process.env.JWT_SECRET, { expiresIn: '4h' });

        userObject.jwtToken = jwtToken;
        res.status(200)
            .json({ message: "success", data: userObject });

    } catch (error) {
        res.status(200).json({
            message: " ERROR"
        });
    }

}

module.exports = {
    UserRegister,
    UserLogin
}