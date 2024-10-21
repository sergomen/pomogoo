import { Schema, model, models } from 'mongoose';

const TimeSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    time: {
        type: Number,
        required: [true, 'Time is required.'],
    },
    title: {
        type: String,
        required: [true, 'Title is required.'],
    },
}, { timestamps: true })

const Time = models.Time || model('Time', TimeSchema);

export default Time;