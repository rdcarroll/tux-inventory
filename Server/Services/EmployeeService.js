module.exports = {
    getEmployees: getEmployees,
    getEmployee: getEmployee,
};

function getEmployees(req, res) {
    let data = [{firstname:'rick',lastname:'carroll'},{firstname:'deborah',lastname:'freeney'}];
    res.send(data);
}
function getEmployee(req, res) {
    let data = {firstname:'rick',lastname:'carroll', ActiveFlag:true, IsAdmin:true};
    if(req.params.id=="Me"){
       // data = {};
    }
    else{
        data = {firstname:'deborah',lastname:'freeney', ActiveFlag:true, IsAdmin:false};
    }
    res.send(data);
}