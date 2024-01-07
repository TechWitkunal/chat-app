const express = require("express");
const {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    makeFriend,
} = require("../controllers/inviteFriends");

const router = express.Router();

router.post("/:userId", handleGenerateNewShortURL);

router.post("/makefriend/:_id/:friendId", makeFriend);

router.get("/:shortId", handleGetAnalytics);

module.exports = router;
