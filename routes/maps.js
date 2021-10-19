/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const generateRandomString = require('../public/scripts/generate_string.js');



module.exports = (db) => {

  router.get('/create', (req, res) => {
    res.render("create_map");
  });

  router.get('/:mapid', (req,res) => {
    const mapID = req.params.mapid //need to have a request coming with the mapid of the selected map
    // console.log(mapID)
    const queryString = `SELECT maps.title AS map_title, maps.description AS map_desc, points.*, users.name AS owner FROM maps JOIN points ON maps.id = map_id JOIN users on maps.user_id = users.id WHERE map_id = $1;`
    const values = [`${mapID}`]
    db.query(queryString, values)
    .then(data => {
      const queryObj = data.rows;
      console.log(queryObj);
      const templateVars = { queryObj }
      res.render('single_map', templateVars);
    })
    .catch(err => {
      console.log('GET single_map err:', err);
      res
        .status(500)
    });
  })

  router.get('/:mapid/edit', (req,res) => {
    const mapID = req.params.mapid //need to have a request coming with the mapid of the selected map
    // console.log(mapID)
    const queryString = `SELECT maps.title AS map_title, maps.description AS map_desc, points.*, users.name AS owner FROM maps JOIN points ON maps.id = map_id JOIN users on maps.user_id = users.id WHERE map_id = $1;`
    const values = [`${mapID}`]
    db.query(queryString, values)
    .then(data => {
      const queryObj = data.rows;
      console.log(queryObj);
      const templateVars = { queryObj }
      res.render('single_map_edit', templateVars);
    })
    .catch(err => {
      console.log('GET single_map err:', err);
      res
        .status(500)
    });
  })

  router.post('/:mapid/delete', (req,res) => {
    const mapID = req.params.mapid
    // console.log(mapID)
    // console.log(req)
    const queryString = `DELETE FROM maps WHERE id = $1;`
    const values = [`${mapID}`]

    db.query(queryString, values)
    .then(data => {
      const queryObj = data.rows;
      console.log(queryObj);
      res.redirect('/api/maps/create')
    })
    .catch(err => {
      console.log('DELETE MAP ERR:', err);
      res
        .status(500)
    });
  })

  router.post('/create', (req, res) => {
    // console.log("req.body",req.body)
    const markers = req.body.markers;
    const mapID = generateRandomString();
    const mapTitle = req.body.mapTitle;
    const mapDesc = req.body.mapDescription;

    const queryStringMaps = `INSERT INTO maps (id, title, description, user_id, preview_image) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const valuesMaps = [`${mapID}`, `${mapTitle}`, `${mapDesc}`, '1', 'https://i.pinimg.com/474x/b4/7b/96/b47b9623ba93546b9a2c412e1abe9306.jpg'];

    const generatePoints = (markers) => {
      for (const marker of markers) {
        const queryStringPoints = `INSERT INTO points (title, description, latitude, longitude, map_id, user_id, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const valuesPoints = [marker.pointTitle, marker.pointDescription, marker.coordinates.lat, marker.coordinates.lng, mapID, '1', marker.category];
        db.query(queryStringPoints, valuesPoints);
      }
    };

    db.query(queryStringMaps, valuesMaps) //query+insert map data first
    .then(() => {
      generatePoints(markers); //query+insert points data second. inside promise.then to ensure that this chains after map creation
    })
      .catch(err => {
        console.error('points_err:', err.message);
        res
          .status(500)
      });
    });

  router.get('/favourite', (req, res) => {
    console.log("index_routes_hi??");
    const queryFaveMaps = `
    SELECT *
    FROM maps
    JOIN favourites ON maps.id = map_id
    WHERE favourites.user_id = $1
    LIMIT 1;
    `;

    db.query(queryFaveMaps, ['1']) //query last favourited map
      .then((results) => {
        console.log("myfavemap:", results.rows);
        res.json(results.rows);
      })
      .catch(err => {
        console.error('points_err:', err.message);
        res
          .status(500)
      });
    });

  router.get('/rowOf3', (req, res) => {
    console.log('inside row3?')
    const query3Imgs = `
    SELECT *
    FROM maps
    LIMIT 3;
    `;
    db.query(query3Imgs)
      .then((results) => {
        console.log("3 maps:", results.rows);
        res.json(results.rows);
      })
      .catch(err => {
        console.error('points_err:', err.message);
        res
          .status(500)
      });
    });

  return router;

};
