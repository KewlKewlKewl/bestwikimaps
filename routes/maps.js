/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM maps`;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/create', (req, res) => {
    res.render("create_map");
  });

  // router.post('/create', (req, res) => {
  //   console.log("req.body",req.body);
  //   const markers = req.body.markers;
  //   const mapTitle = req.body.mapTitle;
  //   const mapDesc = req.body.mapDescription;
  //   const queryStringMaps = `INSERT INTO maps (title, description, user_id, preview_image) VALUES ($1, $2, $3, $4) RETURNING *;`
  //   const queryStringPoints = `INSERT INTO points (title, description, latitude, longtitude, map_id, user_id, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`
  //   const valuesPoints = [`${markers[0].pointTitle}`, `${markers[0].pointDescription}`, `${markers[0].coordinates.lat}`, `${markers[0].coordinates.lng}`,"restaurants"]
  //   const valuesMaps = [`${mapTitle}`, `${mapDesc}`,'1', ]
  //   db.query(queryStringMaps,Valuesmap )
  //     .then(data => {
  //       const maps = data.rows;
  //       // res.json({ maps });
  //       res.render("create_map");
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  //   db.query(queryStringPoints,valuesPoints)
  // });
  return router;
};
