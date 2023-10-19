const router = require('express').Router();
const { User } = require('../../models');

router.get("/", async (req, res) => {
try{
    const allUsers = await User.find({});
    res.json(allUsers)
} catch (err){
    res.status(500).json(err)
}
})

module.exports = router