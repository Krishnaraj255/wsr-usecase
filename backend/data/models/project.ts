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
        type: Map,
        of: [String]
    },
    sprint: {
        type: Object
    },
    createdAt: {
    type: Date,
    default: Date.now 
  },
})

const projectDetailModel = mongoose.model('projectdetail', projectSchema)

export default projectDetailModel