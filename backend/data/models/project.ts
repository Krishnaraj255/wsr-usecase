import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectId: {
        type: String,
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

const projectDetailModel = mongoose.model('projectdetail', projectSchema)

export default projectDetailModel