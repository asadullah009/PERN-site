const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const userAuthRouter = require('./routes/userAuthRoute');
const { PORT, SECRET, CLIENTID, CLIENTSECRET } = require('./schema/secrets');



require('dotenv').config();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(cookieParser());
app.use(express.json());

app.use(
    session({
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy(
    {
        clientID: CLIENTID,
        clientSecret: CLIENTSECRET,
        callbackURL: 'http://localhost:8080/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile)
            .clientID.clientID
        return done(null, profile);
    }
)
)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



// Routes files
app.use('/userauth', userAuthRouter)

app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect to welcome page or do something else
        res.redirect('/welcome');
    }
);


app.listen(PORT, () => {
    console.log('listening on ' + PORT);
})

