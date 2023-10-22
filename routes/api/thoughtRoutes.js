const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get("/", async (req, res) => {
    try{
        const allThoughts = await Thought.find({});
        res.json(allThoughts)
    } catch (err){
        res.status(500).json(err)
        console.error(err)
    }
    });

router.get("/:id", async (req, res) => {
        try{
            const thought = await Thought.findOne({_id: req.params.id})

    
            if (!thought){ 
                return res.status(404).json({message: "No thought with that ID"})
            }
            console.log(thought)
            
    
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
            console.error(err)
        }
    })

router.post('/create', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOne({_id: req.body.userId})
        
        await user.thoughts.push(thought._id)
        await user.save()
         res.status(200).json(user)
    }catch (err) {
        res.status(500).json(err)
        console.error(err)
    }
});

router.put('/:id', async (req, res) => {
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {
                thoughtText: req.body.thoughtText,
            },
            {new:true}, 
        )
        await thought.save()
        res.status(200).json(thought)
    }catch (err) {
        res.status(500).json(err)
        console.error(err)
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await Thought.findByIdAndDelete(req.params.id)
        const user = await User.findOne({username: req.body.username})
        const userThoughts = user.thoughts
        if (userThoughts.includes(req.params.id))
        {  userThoughts.forEach((el, index) => {
            if (el == req.params.id){
                
                userThoughts.splice(index, 1)
            }
          });} else {
            return res.status(400).json({message: "Invalid request, not a valid thought"})
          }
    res.status(200).json(user);
}catch (err) {
    res.status(500).json(err)
    console.error(err)
}
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId})
    if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      const reaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username
    }
     
     thought.reactions.push(reaction);
     console.log(thought)
     await thought.save()
    res.status(200).json(thought)
} catch(err){
    res.status(500).json(err)
    console.error(err)
}
});

router.delete('/:thoughtId/reactions', async (req, res) => {
    try{
        const thought = await Thought.findOne({_id: req.params.thoughtId})
    if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      
      const thoughtReactions = thought.reactions || [];
      const reactions = thoughtReactions.map(i => i.reactionId);
      console.log(reactions[2], req.body.reactionId, `new ObjectId("${req.body.reactionId}")`, reactions[2] == `new ObjectId("${req.body.reactionId}")`)

      if (reactions.includes(req.body.reactionId)){ 
        
        thoughtReactions.forEach((el, index) => {
        if (el.reactionId == req.body.reactionId){
            thoughtReactions.splice(index, 1)
        }
      });
    }
    // await Thought.save()
    res.status(200).json(thought)
    }catch(err){
        res.status(500).json(err)
        console.error(err)
    }
})
module.exports = router