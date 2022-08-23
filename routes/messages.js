"use strict";

const Router = require("express").Router;
const router = new Router();
const Message = require("../models/message");
const { ensureLoggedIn } = require('../middleware/auth');
const { UnauthorizedError } = require("../expressError");



/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Makes sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get('/:id',
    ensureLoggedIn,
    async function (req, res, next) {
 
        const id = req.params.id;

        //variable: res.locals.user.username

        const message = await Message.get(id);

        if (res.locals.user.username !== message.from_user.username ||
            res.locals.user.username !== message.to_user.username) {
                throw new UnauthorizedError();
            }
        
        return res.json(message);



    });



/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/',
    ensureLoggedIn,
    async function (req, res, next) {

        const { to_username, body } = req.body;

        return res.json(await Message.create({
            from_username: res.locals.user.username,
            to_username,
            //trailing comma:
            body,
        }));

    });


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Makes sure that the only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read',
    ensureLoggedIn,
    async function (req, res, next) {

        const id = req.params.id;

        const message = await Message.get(id);

        if (res.locals.user.username !== message.to_user.username) {
            throw new UnauthorizedError();
        }
        
        //return object
        return res.json(await Message.markRead(id));

    });


module.exports = router;