const {model, Schema} = require('mongoose');

const LandsSchema = new Schema({
    landId: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true
    },
    citizenshipNo:{
        type: String,
        required: true
    },
    areaSize: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['available', 'sold', 'pending'],
        default: 'available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    verified:{
        type: Boolean,
        default: false,
    },
    verificationDate:{
        type: Date,
        default: null,
    },
    verifiedBy:{
        userId: {
            type: String,
            default: null
        },

    }
    

});

module.exports = model('Lands', LandsSchema);