const { addMessage, getAllMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/getmsg/", getAllMessages);
router.post("/addmsg/", addMessage);


module.exports = router;