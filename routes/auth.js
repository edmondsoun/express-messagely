"use strict";

const { SECRET_KEY } = require("../config");
const User = require("../models/user");
const { UnauthorizedError } = require("../expressError")

const Router = require("express").Router;
const router = new Router();

//does app.use get pulled in from app.js?

const jwt = require("jsonwebtoken");

/** POST /login: {username, password} => {token} */

router.post("/login", async function (req, res, next) {

    const { username, password } = req.body;

    if (await User.authenticate(username, password)) {
        const token = jwt.sign({ username }, SECRET_KEY);
        //TODO: update login timestamp
        return res.json({ token });
    }

    throw new UnauthorizedError("Invalid user/password");

});

/** POST /register: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 */

router.post("/register", async function (req, res, next) {

    const { username, password, first_name, last_name, phone } = req.body;

    const user = await User.register({username, password, first_name, last_name, phone});

    //TODO: update login timestamp

    //check value returns from DB as new source of truth:
    const token = jwt.sign({ username: user.username }, SECRET_KEY);

    return res.json({ token });

    
});

module.exports = router;