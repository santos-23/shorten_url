const router = require("express").Router();
const { test, shorten_url, get_original_url } = require("../controllers/controller");

router.get('/test', test);
router.post('/short', shorten_url);
router.get('/:short_url', get_original_url)

module.exports = router