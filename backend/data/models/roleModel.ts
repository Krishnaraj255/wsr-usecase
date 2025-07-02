import mongoose, { mongo } from "mongoose";

const roleSchema = new mongoose.Schema({
    roleId: {
        type: String,
        required: true
    },
    roleName: {
        type: [String],
        required: true
    }
})

const roleModel = mongoose.model('roles', roleSchema)

export default roleModel
