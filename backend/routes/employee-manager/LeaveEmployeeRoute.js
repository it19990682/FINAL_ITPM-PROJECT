const router = require("express").Router();
const LeaveEmployee = require("../../models/employee-manager/leaveEmployeeModel");


router.post('/',async(req,res)=>{
    try{
        const leave = await LeaveEmployee.create(req.body);
        res.status(200).send({data : leave});

    }catch(err){
        res.status(500).send({status : err});
    }
})


router.get('/', async(req,res)=>{
    try{
        const allLeaves = await LeaveEmployee.find();
        res.status(200).send({data : allLeaves});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update vehicles
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const { eName, empID, position, reson, leaveStart, leaveEnd,TelPhone} = req.body;

        const updateLeaveEmployee = new LeaveEmployee({
           _id, eName, empID, position, reson, leaveStart, leaveEnd,TelPhone
        });

        await LeaveEmployee.findByIdAndUpdate(_id,updateLeaveEmployee)
        res.status(200).send({data : updateLeaveEmployee});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific vehicle from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const leaveEmployee = await LeaveEmployee.find({_id : id})
        res.status(200).send({data : leaveEmployee});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete vehicle from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedLeaveEmployee = await LeaveEmployee.findByIdAndDelete(id)
        res.status(200).send({data : removedLeaveEmployee});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;