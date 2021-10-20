/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // router.get('/', (req, res) => {
  //   res.render("create_map");
  // });

  router.get('/', (req, res) => {
    res.render("profile"); //this is working?
    });

    return router;

};
