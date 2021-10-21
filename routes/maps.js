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

  // generatesPoints
  const generatePoints = async (markers, mapID) => {
    for (const marker of markers) {
      const queryStringPoints = `INSERT INTO points (title, description, latitude, longitude, map_id, user_id, category, point_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
      const valuesPoints = [marker.pointTitle, marker.pointDescription, marker.coordinates.lat, marker.coordinates.lng, mapID, '1', marker.category, marker.pointImage];
      await db.query(queryStringPoints, valuesPoints);
    }
    return;
  };

  router.get('/create', (req, res) => {
    const cookieId = req.session.user_id;

    if (!cookieId) {
      res.redirect('/index');
    }

    const templateVars = {
      user: req.session.user_id
    };

    res.render("create_map", templateVars);
    // console.log('cookie:', req.session.user_id)
  });

  router.post('/create', (req, res) => {
    // console.log("req.body",req.body)
    const markers = req.body.markers;
    const mapID = generateRandomString();
    const mapTitle = req.body.mapTitle;
    const mapDesc = req.body.mapDescription;

    const queryStringMaps = `INSERT INTO maps (id, title, description, user_id, preview_image) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const valuesMaps = [`${mapID}`, `${mapTitle}`, `${mapDesc}`, '1', 'https://i.pinimg.com/474x/b4/7b/96/b47b9623ba93546b9a2c412e1abe9306.jpg'];

    db.query(queryStringMaps, valuesMaps) //query+insert map data first
    .then(async () => {
      await generatePoints(markers, mapID); //query+insert points data second. inside promise.then to ensure that this chains after map creation
      res.json({ mapID: mapID }) //ajax loaded the page but the mssg ajax sent didnt say anyhing about rendering a page. redirect + json does not combo well
    })
      .catch(err => {
        console.error('points_err:', err.message);
        res
          .status(500)
      });
    });

  router.get('/favourite', (req, res) => {
    //console.log("index_routes_hi??");
    const queryFaveMaps = `
    SELECT *
    FROM maps
    JOIN favourites ON maps.id = map_id
    WHERE favourites.user_id = $1
    ORDER BY maps.id DESC
    LIMIT 1;
    `;

    db.query(queryFaveMaps, ['1']) //query last favourited map
      .then((results) => {
        //console.log("querytrue1");
        //console.log("myfavemap:", results.rows);
        res.json(results.rows);
      })
      .catch(err => {
        console.error('points_err:', err.message);
        res
          .status(500)
      });
    });


  router.post('/favourite', (req, res) => {
    const mapID = req.body.map_id;
    console.log(mapID);
    const query = `INSERT INTO favourites (user_id, map_id) VALUES ($1, $2) RETURNING *`;
    const values = [`1`, `${mapID}`];

    db.query(query, values) //query last favourited map
      .then((results) => {
        console.log(results);
      })
      .catch(err => {
        console.error('points_err:', err.message);
        res
          .status(500)
      });
    });


    router.get('/oneMap', (req, res) => {
      const query = `
      SELECT *
      FROM maps
      ORDER BY id DESC
      LIMIT 1;
      `;

      db.query(query)
        .then((results) => {
          res.json(results.rows);
        })
        .catch(err => {
          console.error('points_err:', err.message);
          res
            .status(500)
        });
      });

  router.get('/rowOf3', (req, res) => {
    //console.log('inside row3?')
    const query3Imgs = `
    SELECT *
    FROM maps
    LIMIT 3;
    `;
    db.query(query3Imgs)
      .then((results) => {
        //console.log("3 maps:", results.rows);
        res.json(results.rows);
      })
      .catch(err => {
        console.error('points_err:', err.message);
        res
          .status(500)
      });
    });

  router.get('/rowOf3MapsCreated', (req, res) => {
    //console.log('inside row3?')
    const query = `
    SELECT *
    FROM maps
    WHERE user_id = $1
    LIMIT 3;
    `;
    db.query(query, ['1'])
      .then((results) => {
        res.json(results.rows);
      })
      .catch(err => {
        console.error('points_err:', err.message);
        res
          .status(500)
      });
    });

  router.get('/rowOf3MapsContributed', (req, res) => {
    const query = `
    SELECT *, maps.title
    FROM maps
    JOIN points ON map_id = maps.id
    WHERE points.user_id = $1
    LIMIT 3;
    `;
    db.query(query, ['1'])
      .then((results) => {
        res.json(results.rows);
      })
      .catch(err => {
        console.error('points_err:', err.message);
        res
          .status(500)
      });
    });

  router.get('/rowOf3MapsFavourited', (req, res) => {
    const query = `
    SELECT *
    FROM maps
    JOIN favourites ON map_id = maps.id
    WHERE favourites.user_id = $1
    LIMIT 3;
    `;
    db.query(query, ['1'])
      .then((results) => {
        res.json(results.rows);
      })
      .catch(err => {
        console.error('points_err:', err.message);
        res
          .status(500)
      });
    });

  router.get('/:mapid/edit', (req,res) => {
    const mapID = req.params.mapid //need to have a request coming with the mapid of the selected map
    // console.log(mapID)
    const queryString = `SELECT maps.title AS map_title, maps.description AS map_desc, points.*, users.name AS owner FROM maps JOIN points ON maps.id = map_id JOIN users on maps.user_id = users.id WHERE map_id = $1;`
    const values = [`${mapID}`]

    const cookieId = req.session.user_id;

    if (!cookieId) {
      res.redirect('/index');
    }

    db.query(queryString, values)
    .then(data => {
      const queryObj = data.rows;
      const templateVars = { queryObj, user: req.session.user_id }
      res.render('single_map_edit', templateVars);
    })
    .catch(err => {
      console.log('GET single_map err:', err);
      res
        .status(500)
    });
  })

  router.post('/mapid/edit', (req,res) => {
    const markers = req.body.markers;
    const mapID = req.body.mapId;
    // console.log(mapId)
    // console.log(markers)
    const deleteQueryString = `DELETE FROM points WHERE map_id = $1;`
    const deleteValues = [mapID];

    db.query(deleteQueryString, deleteValues)
    .then(async () => { //async + await syntax . newer version of syntax that organizes async codes. await says wait for the respsonse of asynch function (the async). asycn key words goes at start of fcunoiont taht defines the function as async.  and the await waits for this to finish.
      await generatePoints(markers, mapID);
      res.json({ mapID: mapID });
    })
    .catch(err => {
      console.log('POST EDIT MAP ERR:', err);
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
      // console.log(queryObj);
      res.redirect('/index')
    })
    .catch(err => {
      console.log('DELETE MAP ERR:', err);
      res
        .status(500)
    });
  })

  router.get('/:mapid', (req,res) => {
    const mapID = req.params.mapid //need to have a request coming with the mapid of the selected map
    console.log("mapID:", mapID);
    const queryString = `
    SELECT maps.title AS map_title, maps.description AS map_desc, points.*, users.name AS owner
    FROM maps
    JOIN points ON maps.id = map_id
    JOIN users on maps.user_id = users.id
    WHERE map_id = $1;`;
    const values = [`${mapID}`];

    const cookieId = req.session.user_id;

    db.query(queryString, values)
    .then(data => {
      const queryObj = data.rows;
      const templateVars = { queryObj, user: req.session.user_id }
      // console.log(templateVars);
      res.render('single_map', templateVars);
    })
    .catch(err => {
      console.log('GET single_map err:', err);
      res
        .status(500)
    });
  })

  return router;

};


