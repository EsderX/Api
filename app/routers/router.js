
let express = require('express');
let router = express.Router();
 
const musics = require('../controllers/controller.js');

router.post('/api/music/create', musics.create);
router.get('/api/music/all', musics.retrieveAllCustomers);
router.get('/api/music/pagination', musics.pagination);
router.get('/api/music/pagefiltersort', musics.pagingfilteringsorting);
router.put('/api/music/update/:id', musics.updateById);
router.delete('/api/music/delete/:id', musics.deleteById);

module.exports = router;

