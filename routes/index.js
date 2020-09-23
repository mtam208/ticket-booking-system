var express = require('express');
var router = express.Router();

const movieController = require('../controllers/movieController')

/* GET home page. */
router.get('/', movieController.homepage);

/* GET list of showing movies */
router.get('/movie/showing', movieController.showingList);

/* GET list of upcoming movies */
router.get('/movie/upcoming', movieController.upcomingList);

/* GET movie info page */
router.get('/movie/:id', movieController.movieInfo);

/* GET list of cinemas showing selected movie */
router.get('/movie/:movieId/cinema', movieController.cinemaList);

/* GET list of showDate which selected cinema has */
router.get('/movie/:movieId/cinema/:cinemaId/showDate', movieController.showDateList);

/* GET list of showTime which selected showDate has */
router.get('/movie/:movieId/cinema/:cinemaId/showDate/:showDateId/showTime', movieController.showTimeList);

module.exports = router;
