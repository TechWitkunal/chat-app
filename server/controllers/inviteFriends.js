const shortid = require("shortid");
const InviteFrieds = require("../models/InviteLink");
const express = require('express');


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    const userId = req.params.userId.replace(':', '')
    if (!body.url || !userId) return res.status(400).json({ error: "url is required" });
    const shortID = shortid();

    await InviteFrieds.create({
        shortId: shortID,
        redirectURL: body.url,
        userId: userId,
        visitHistory: [],
    });

    return res.json({ id: shortID });
}

async function makeFriend(req, res) {
    try {
        const friendId = req.params.friendId;
        const userId = req.params._id
        console.log(friendId, userId);
        let friend, user;
        let isFriendExist = await InviteFrieds.findOne({ shortId: friendId })
        // console.log(isFriendExist.friends.length != 0)
        if (isFriendExist.friends.length != 0) { console.log("if .1"); friend = isFriendExist }
        else { friend = await InviteFrieds.findOneAndUpdate({ shortId: friendId }, { friends: userId }) }
        const isUserExist = await InviteFrieds.findById({ _id: userId })
        if (isFriendExist.friends.length != 0) { console.log("if .1"); user = isUserExist }
        else { user = await InviteFrieds.findById({ _id: userId }, { friends: friend._id}) }
        console.log(friend, user)
    } catch (error) {
        console.log('error')
        console.log('error come', error)
    }
    res.redirect("/")
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await InviteFrieds.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    makeFriend,
};
