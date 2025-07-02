import mongoose from "mongoose";

const projectDetailSchema = new mongoose.Schema({
    projectId: {
        type: Number,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    resources: {
        type: Object,
        required: true
    },
    sprint: {
        type: Object
    }
})

const projectDetailModel = mongoose.model('projectdetail', projectDetailSchema)

export default projectDetailModel