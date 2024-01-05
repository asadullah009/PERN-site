const prisma = require('../DB/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRETS } = require('../schema/secrets');




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
            // data: newUser,
            message: 'User Registered'
        });
    } catch (error) {
        res.status(200).json({
            message: " ERROR"
        });
    }

}



// Login User
const UserLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(403).json({
                message: 'empty email or password'
            });
        }

        const user = await prisma.UserAuth.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(403).json({
                message: 'User not Found'
            });
        }

        // Check Password
        const isPassMatch = await bcrypt.compare(password, user.password);
        if (!isPassMatch) {
            return res.status(403).json({ message: "Auth failed username/password incorrect" });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRETS, { expiresIn: '40s' });

        res.cookie(String(user.id), token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 600), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
        });

        res.status(200).json({ message: "success", token }); // Send the token as a response

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
}

const varifyToken = async (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(token);
    if (!token) {
        return res.status(403).json({ message: 'Empty Or Invalid Token ' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRETS);
        console.log('Token verified successfully');

        const user_id = decodedToken.userId;
        const getuser = await prisma.userAuth.findFirst({
            where: {
                id: user_id,
            },
        });

        if (!getuser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user: getuser });
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(403).json({ message: 'Token verification failed' });
    }
};

const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies?.split("=")[1]; // Use optional chaining to handle undefined cookies

    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" });
    }

    jwt.verify(prevToken, JWT_SECRETS, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ message: "Token has expired. Please log in again" });
        }

        const { userId } = decoded; // Extracting 'userId' from decoded token

        const newToken = jwt.sign({ userId }, JWT_SECRETS, {
            expiresIn: "35s", // Refreshed token expiration time
        });

        console.log("Regenerated Token\n", newToken);

        res.cookie(String(userId), newToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 30), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
        });

        req.userId = userId;
        next();
    });
};

const updateUserDetails = async (req, res) => {
    try {
        const userDeatils = req.body;
        const updateUserDeatils = await prisma.UserAuth.update({
            where: {
                id: +req.params.id,
            },
            data: userDeatils
        })

        return res.json(updateUserDeatils)
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ message: 'Error updating user details' });
    }
};

const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRETS, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({ message: "Successfully Logged Out" });
    });
};

module.exports = {
    UserRegister,
    UserLogin,
    varifyToken,
    refreshToken,
    updateUserDetails,
    logout
}