import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
    },
    employeeNames: {
        type: [String],
        required: true
    }
})

const employeeModel = mongoose.model('employee', employeeSchema)

export default employeeModel