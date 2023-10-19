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
        // .populate({path: 'thoughts', select: '__v'});
        .populate('thoughts')
        .populate('friends')

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
router.post('/create', async (req, res) => {
    try{
    const user = await User.create(req.body)
    res.json(user)
    }catch (err) {
        res.status(500).json(err)
        console.error(err)
    }
})
router.put('/:id', async (req, res) => {
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {
                username: req.body.username,
                email: req.body.email,
            },
            {new:true}, 
        )
        res.json(user)
    }catch (err) {
        res.status(500).json(err)
        console.error(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
    console.log(user)
    res.status(200).json(user);
}catch (err) {
    res.status(500).json(err)
    console.error(err)
}
})

module.exports = router