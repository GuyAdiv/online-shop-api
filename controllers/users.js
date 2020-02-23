const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const _pass = '$2a$10$vSWoKOzS4oRgYBhYyzM60OWe7fldnXVDcFUzInSvDLShA4yyYslS6' //'demouser'
const _user = 'demo@gmail.com'

async function isAuthUser (user, password) {

    const isAuth = await bcrypt.compare(password, user.password);
    return isAuth;
}

function getUser (username) {
    let user;
    
    if (username === _user) {
        user = {
            username: _user,
            password: _pass,
            id: "5d9228a2bc40c7137c4bc055"
        }
    }

    return user;
}

exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = getUser(username);

        if (!user) {
            const error = new Error('The user is not authenticated.');
            error.statusCode = 401;
            throw error;
        }

        const isAuth = await isAuthUser(user, password);

        if (!isAuth) {
            const error = new Error('The user is not authenticated.');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            username: username,
            userId: user.id
        },
        'secretkey',
        {
            expiresIn: '1h'
        });

        res.status(200).json({ 
            token: token, 
            user: {
                id: user.id
            }
        });

    } catch (error) {
        next(error);
    }
}