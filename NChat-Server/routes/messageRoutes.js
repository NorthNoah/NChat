const { addMsg, getMessages } = require("../controller/messagesController")
const { Router } = require("express")
const router = Router()

router.post("/addmsg/", addMsg)
router.post("/getmsg/", getMessages)

module.exports = router
