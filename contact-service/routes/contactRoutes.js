const router = require("express").Router();
const contactController = require("../controllers/contactControllers")
const { checkUser, requireAuth } = require("../middleware/authMiddleware")

router.get("/" , [requireAuth, checkUser] , contactController.contact_get)
router.post("/" ,[requireAuth, checkUser], contactController.contact_post)
router.delete("/:id" , [requireAuth, checkUser], contactController.contact_delete)
router.put("/" , [requireAuth, checkUser], contactController.contact_put)
router.put("/:id" , [requireAuth, checkUser], contactController.contact_put_one)

module.exports = router;