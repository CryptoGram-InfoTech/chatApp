const express = require('express');
const router = express.Router();
const controller = require("./controllers/chat.controller.js");
const { authenticate } = require('../../middlewares/jwt.middleware');
const {
    wrapAsync
} = require("./../../helpers/router.helper");

const {
    upload
} = require("../../util/multer-s3");
 // new Chats api's
router.post("/chatToUser", authenticate,wrapAsync(controller.chatToUser));


// 
// router.post("/check",wrapAsync(controller.check));
// 

router.post("/newChatDocument", authenticate,wrapAsync(controller.newChatDocument));
router.post("/insertUser", authenticate,wrapAsync(controller.insertUser));
router.post("/ejectUser", authenticate,wrapAsync(controller.ejectUser));
// router.post("/adminToUser", authenticate,wrapAsync(controller.adminToUser));

// 
router.get("/getMessages", authenticate,wrapAsync(controller.getMessages));
// 
// old chats api's
router.get("/oldChats", authenticate,wrapAsync(controller.oldChats));


router.post("/block",authenticate,wrapAsync(controller.blockauser));

router.post("/unBlock",authenticate,wrapAsync(controller.unBlockauser));

router.get("/BlockUsers",authenticate,wrapAsync(controller.getBlocked));

router.get("/blockedby",authenticate,wrapAsync(controller.blockedBy));
// router.get("/admin/searchChats/:userId",authenticate ,wrapAsync(controller.searchChats));

// router.get("/admin/allChats", authenticate, wrapAsync(controller.allChats));
// router.get("/klickedmeter",authenticate,wrapAsync(controller.klickedmeter));

// router.get("/chatDocument/:id", authenticate,wrapAsync(controller.ChatDocument));

module.exports = router;

