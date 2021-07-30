const router = require('express').Router();
const cateController = require('../controllers/cateController')
//const { verifyUser, verifyAdmin } = require("../middleware/verifyToken"); //new import

router.post('/', cateController.createCategory);

router.get('/show', cateController.getCategories);
router.delete('/:catId', cateController.deleteCategory);
router.patch('/:id', cateController.updateCategory);

module.exports = router;