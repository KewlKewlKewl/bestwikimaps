/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const cookieSession = require('cookie-session');
const app = express();
app.use(cookieSession({
  name: 'cookiemonster',
  keys: ['my secret key', 'yet another secret key']
}));

module.exports = (db) => {

  // router.get('/', (req, res) => {
  //   res.render("create_map");
  // });

  router.get('/', (req, res) => {
    const templateVars = {
      user: req.session.user_id
    };
    // console.log('cookie:', req.session.user_id)
    res.render("index", templateVars); //this is working?
  });

    return router;

};
