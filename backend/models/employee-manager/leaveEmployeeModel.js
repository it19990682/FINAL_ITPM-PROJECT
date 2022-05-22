const mongoose = require("mongoose");

const leaveEmployee = new mongoose.Schema({
    eName : { type: String, required : true },
    empID : { type: String, required : true },
    position : { type: String, required : true },
    reson : { type: String, required : true },
    leaveStart : { type: Date, required : true },
    leaveEnd : { type: Date, required : true },
    telePhone : { type: Number, required : true },
});

const LeaveEmployee = mongoose.model("LeaveEmployee",leaveEmployee);

module.exports = LeaveEmployee;
