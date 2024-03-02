const express = require("express")
const router = express.Router()
const cron = require('node-cron')
const voteController = require("../Controllers/VotesControllers")


router.post("/vote/:userId", voteController.addVote)


router.get('/getvotescount', voteController.voteCount)


// This function will run at 10 pm and then the winner will be saved in database
cron.schedule("20 37 15 * * *", voteController.cronJob)


router.get("/getwinner", voteController.getWinner)


router.get("/getvotes", voteController.getVotes)



module.exports=router
