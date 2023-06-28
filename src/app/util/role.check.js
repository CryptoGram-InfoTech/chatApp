let { msg } = require("../../config/message");

exports.checkIfSuperAdmin = (roleId) => {
  
    if (roleId!= 1) throw msg.actionForbidden;
    else {  
        return true;
    }
  
}

exports.checkIfAdmin = (roleId) => {
 if (roleId != 1  && roleId !=2) throw msg.actionForbidden;
    return true;
}

exports.checkIfCustomerSupport = (roleId)=>{
    if(roleId>=0 && roleId<=3) return true;
    throw msg.actionForbidden;
}

exports.checkIfCustomer = (roleId)=>{
    if(roleId!=0) throw msg.actionForbidden;
    return true;
}