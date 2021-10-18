/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   let query = `SELECT * FROM maps`;
  //   console.log(query);
  //   db.query(query)
  //     .then(data => {
  //       const maps = data.rows;
  //       res.json({ maps });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  router.get('/create', (req, res) => {
    res.render("create_map");
  });

  router.post('/create', (req, res) => {
    // console.log("req.body",req.body)
    const markers = req.body.markers;
    const mapTitle = req.body.mapTitle;
    const mapDesc = req.body.mapDescription;

    const queryStringMaps = `INSERT INTO maps (title, description, user_id, preview_image) VALUES ($1, $2, $3, $4) RETURNING *`;
    const valuesMaps = [`${mapTitle}`, `${mapDesc}`, '1', 'https://i.pinimg.com/474x/b4/7b/96/b47b9623ba93546b9a2c412e1abe9306.jpg'];

    // for (let i = 0; i < markers; i++ {markers[i].pointTitle ... etc etc})
    const queryStringPoints = `INSERT INTO points (title, description, latitude, longitude, category) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const valuesPoints = [`${markers[3].pointTitle}`, `${markers[3].pointDescription}`, `${markers[3].coordinates.lat}`, `${markers[3].coordinates.lng}`, `${markers[3].category}`];

    db.query(queryStringMaps, valuesMaps) //query+insert map data first
      .then(data => {
        const map = data.rows;
        console.log('mapsDB:', map)
        db.query(queryStringPoints, valuesPoints) //query+insert points data second. inside promise.then to ensure that this chains after map creation
        .then(data => {
          const points = data.rows;
          console.log('pointsDB:', points)
        })
        .catch(err => {
          console.error('points_err:', err.message);
          res
            .status(500)
        });
      })
      .catch(err => {
        console.error('map_err:', err.message);
        res
          .status(500)
      });




  });

  return router;

};
