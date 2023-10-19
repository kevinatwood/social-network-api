const router = require('express').Router();
const { User } = require('../../models');

router.get("/", async (req, res) => {
try{
    const allUsers = await User.find({});
    res.json(allUsers)
} catch (err){
    res.status(500).json(err)
    console.error(err)
}
})

router.get('/:id', async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id})
        .populate({path: 'thoughts', select: '__v'});

        if (!user){ 
            return res.status(404).json({message: "No user with that ID"})
        }
        console.log(user)
        

        res.json(user)
    } catch (err) {
        res.status(500).json(err)
        console.error(err)
    }
})
module.exports = router