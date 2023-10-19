const { Schema, model, Types} = require('mongoose');
const dayJS = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: 
        {type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()},
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        }, 
        username: {
            type: String,
            required: true,
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(date){ 
                return dayJS(date).format('MM/DD/YYYY')
            }
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
    
);

module.exports = reactionSchema