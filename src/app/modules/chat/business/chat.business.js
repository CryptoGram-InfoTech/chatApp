let { msg } = require("../../../../config/message");

const { User } = require("../../user/models/user.model");

const { plans } = require("../../plans/model/plans.model");

const { Chat } = require("./../model/chat.model");

const { chatOnlineUser } = require("./../model/onlineUsers.model");

const { Blocked } =require("../model/blocked.model");


const {
  env
} = require("../../../../environment/environment");
// let { socket } = require("../../socket/realTime");
let {
  checkIfAdmin,
  checkIfSuperAdmin,
  checkIfCustomerSupport,
  checkIfCustomer,
} = require("../../../util/role.check");


exports.chatToUser = async (user, socket, data) => {
  // console.log(socket)
  if(!data.outgoingMessages){throw msg.invalidCredentials}
// let chatUser =  await Chat.find({username:user.username}).sort({_id:-1}).limit(1);

let chatUser;
    chatUser =  await Chat.findOne({_id:data.chatId})
    // console.log('chatuser',chatUser);




   // let msgcount=chatUser.outgoingMessages.length;
    let profileUnblurePercentage=process.env.unblurringProfilePercentage;
    let unblurringMessege=process.env.unblurringChatMessege;
    // console.log('profileUnblurePercentage',profileUnblurePercentage);
    // console.log('unblurringMessege',unblurringMessege);
    if(user.purchasedPlan){
     // console.log('Plan Pershed')
      let plan = await plans.findOne({_id:user.purchasedPlan})
      // console.log(plan)
      profileUnblurePercentage=plan.unblurringProfilePercentage;
      unblurringMessege=plan.unblurringChatMessege;
      let messageLength
      if(!chatUser.outgoingMessages){
        messageLength = 0;
        // throw msg.CouponNotExist
      }
      else{
        messageLength = chatUser.outgoingMessages.length
        console.log(messageLength)
      }
      
      if(messageLength > plan.chatMessage){
        throw msg.messageLimit
      }
    }

    else
    {
      //logic for if not perchase d a plan
      //console.log('Not Plan Pershed',chatUser)
      let messageLength
      if(!chatUser.outgoingMessages){
        messageLength = 0;
        // throw msg.CouponNotExist
      }
      else{
        messageLength = chatUser.outgoingMessages.length
        
      }
      // console.log('meseege',messageLength)
      
     // console.log('process.env.defaultMessageCount',process.env.defaultMessageCount)
      if(messageLength > process.env.defaultMessageCount){
        throw msg.messageLimit
      }


      
    }
  //  if(!chatUser.length){
  //    chatUser = await Chat.findOne({idReceiver:user._id,userId:data.idReceiver},{outgoingMessage:0, incomingMessage:0})
  //  }
// await Chat.find({username:data}).sort({_id:-1}).limit(1)
// Chat.findOne({userId:user._id}).sort({_id:-1}).limit(1);
//logic for validate block a user .
//console.log('chatUser.idReceiver',chatUser.idReceiver);
let tid=data.outgoingMessages[0].userId;
let rid=chatUser.idReceiver
let blockedusers=await Blocked.findOne({userId:tid,blockedUser:{$in:[rid]}});
let userBlockYou= await Blocked.findOne({userId:rid,blockedUser:{$in:[tid]}});
if(userBlockYou) throw 'You Has been blocked by user'
//console.log('blockedusers',blockedusers);
if(blockedusers) throw 'You Blocked This User.';
      if (chatUser) {
        chatUser = await Chat.findOneAndUpdate(
          { _id: chatUser._id },
          // take data._id as id
          { $addToSet: { outgoingMessages: data.outgoingMessages } },
          {new: true}
        );
        
//Old Logic For logic for klicked meter
let msgCount=chatUser.outgoingMessages.length;
// let upeerLimit=process.env.klickedmetermaxLimit;
// let lowerLimit=process.env.klickedmeterUnblurLimit;
// let res=(msgCount*100)/upeerLimit;
// res=(res*lowerLimit)/100;

let res=(profileUnblurePercentage/unblurringMessege*msgCount)
// console.log('profileUnblurePercentage',profileUnblurePercentage);
//  console.log('unblurringMessege',unblurringMessege)
//  console.log('respponse',res);
// console.log('msgCount',msgCount);
// console.log('res for clicked meter',res);
chatUser = await Chat.findOneAndUpdate(
  { _id: chatUser._id },
  // take data._id as id
  {klickedMeter:res},
  {new: true}
);    
        let socket1 = await socket.emit("messages",user,data.chatId);
        // console.log("hii")
        // console.log(socket1)
        return {
          result: chatUser.outgoingMessages,
        };
      } 
      else{
           data.userId = user._id;
          //  data.firstName = user.firstName;
          //  also take data.idReceiver
           let chat = new Chat(data);
            res = await chat.save();
            await socket.emit("messages",user,data.chatId);
            return {
              res
            }
          }
        };

// exports.check = async (user, socket, data) => {
//   // let result = await Chat.findOne({username:data.username}).sort({username:-1}).limit(1);
//   let chatUser =  await Chat.find({username:data.username}).sort({_id:-1}).limit(1);
//   console.log(chatUser)
//   if (chatUser.length) {
//     let chatUser1 = await Chat.findOneAndUpdate(
//       { _id: chatUser[0]._id },
//       { $addToSet: { outgoingMessages: data.outgoingMessages } },
//       {new: true}
//     );
//     await socket.emit("messages", chatUser.username);
//     return {
//       result: chatUser1,
//     };
//   } 
//   else{
//     console.log("hii")
//     return {
//       result: "chatUser1",
//     };
//   }

//   // let result = await Chat.find({username:data.username}).sort({_id:-1}).limit(1);
//   // console.log(result[0].outgoingMessages)
//   // return {result:chatUser}

// };


exports.newChatDocument = async (user, socket, data) => {
 // console.log(user)
  if(!data.idReceiver){
    throw msg.NotCreated
  }

   let chatUser =  await Chat.findOne({userId:user._id,idReceiver:data.idReceiver},{outgoingMessages:0,incomingMessages:0})
   if(!chatUser){
     let chatUser1 = await Chat.findOne({idReceiver:user._id,userId:data.idReceiver},{outgoingMessage:0, incomingMessage:0})
     if(!chatUser1){
      data.userId = user._id;
      data.firstName = data.firstName;
      //  also take data.idReceiver from parameters
      let chat = new Chat(data);
      res = await chat.save();
      return {
        res
      };
     }
     else{
      throw msg.chatExist
     }
    }
    else{
      throw msg.chatExist
     }
};

// exports.adminToUser = async (user, socket, data) => {
//   if(!data.incomingMessages || !data.username){throw msg.invalidCredentials}
//   let chatUser =  await Chat.find({username:data.username}).sort({_id:-1}).limit(1);

// this is the or condition

// chatUser =  await Chat.find({$or:[{userId:user._id}, {idReceiver:user._id}]},{outgoingMessages:0,incomingMessages:0})

// above condition for finding any user as sender or receiver

//   // let chatUser = await Chat.findOne({ username: data.username });
//   // chatUser = await Chat.findOneAndUpdate(
//   //   { username: data.username },
//   //   { $addToSet: { incomingMessages: data.incomingMessages } },
//   //   { new: true }
//   // );
//   let chatUser2;
//   if(chatUser.length){
//      chatUser2 = await Chat.findOneAndUpdate(
//       { _id: chatUser[0]._id },
//       { $addToSet: { incomingMessages: data.incomingMessages } },
//       {new: true}
//     );
//   }
//   else{
//      chatUser2 = await Chat.findOneAndUpdate(
//       { _id: user._id },
//       { $addToSet: { incomingMessages: data.incomingMessages } },
//       {new: true}
//     );
//   }
 
//   await socket.emit("messages", chatUser2.username);
//   return {
//     result: chatUser2.incomingMessages,
//   };
// };



exports.getMessages = async (user, socket,query) => {
  let chatUser = await Chat.findOne({_id:query.chatId}).sort({_id:-1}).limit(1);
  let array1 = await chatUser.outgoingMessages;
  // let array1 = await array.concat(chatUser.incomingMessages);
  if(!array1.length){
    throw msg.NotExist
  }
  array1= await array1.sort(function(a,b){
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  array1 = array1.reverse()
 // console.log(array);
  return {
    receiverName:chatUser.firstName,
    array:array1
  };
};

// 
exports.insertUser = async (user,socket,data) => {
    let onlineUser = await chatOnlineUser.findOne({userId:user._id});
    let r=await User.findByIdAndUpdate(user._id,{$set:{lastActivityTime:Date.now()}});
  //console.log('Online User',user.blockedByAdmin);
    if(user.blockedByAdmin) throw msg.blockByUser;
    if(onlineUser){
      let userChat =  await chatOnlineUser.findOneAndUpdate({userId:user._id},{$set:{online:true}},{new:true})
      await socket.emit("onlineUsers")
      return{
        result: userChat
       }
    }
    else {
      data.online=true;
      data.firstName=user.firstName;
      data.userId=user._id;
      let userChat = new chatOnlineUser(data);
      userChat= await userChat.save()
      await socket.emit("onlineUsers")
      return{
       result: userChat
      }
    }
}

exports.ejectUser = async (user,socket) =>{
  let onlineUser = await chatOnlineUser.findOne({userId:user._id})
  if(!onlineUser){ throw msg.userNotFound}
  else{
    onlineUser = await chatOnlineUser.findOneAndUpdate({userId:user._id},{$set:{online:false}},{new:true})
    await socket.emit("onlineUsers")
    return{
      result:onlineUser
    }
  }
}

exports.oldChats = async (user,data,socket) => {
  // console.log("hii")
  // console.log(data)
  // console.log(socket)
  let chatUser;
    chatUser =  await Chat.find({$or:[{userId:user._id}, {idReceiver:user._id}]},{outgoingMessages:1,klickedMeter:1})
    .populate('userId',{profileImage:1,klickedMeter:1,firstName:1})
    .populate('idReceiver',{profileImage:1,klickedMeter:1,firstName:1})
    
    console.log('Chat User length ',)
    if(chatUser.length>0 &&chatUser[0].outgoingMessages.length>0) {
   
      let result =[];
      let arr=[]
      for (const iterator of chatUser) {
        let obj={}
             obj._id=iterator._id,
        obj.createdAt=(iterator.outgoingMessages[iterator.outgoingMessages.length-1]).createdAt;
        arr.push(obj);
      }
      let sorted=arr.sort(function(a,b){return b.createdAt.getTime() - a.createdAt.getTime()});
    //  console.log('sorted',sorted); 
   
     for (const iterator of sorted) {
      //  console.log(iterator._id);
       for (const element of chatUser) {
         if(element._id==iterator._id){ 
          // console.log('true'); 
          result.push(element);}
       }
     }
    //  console.log('result',result);
     return {
      result:result
    }
    }


  //   chatUser.outgoingMessages.sort((a,b)=>{
  //   return new Date(b.createdAt) - new Date(a.createdAt)
  //  })
  //  if(!chatUser.length){
  //    chatUser = await Chat.find({idReceiver:user._id},{outgoingMessage:0, incomingMessage:0})
  //  }
  // console.log(chatUser)
   return{
     result:chatUser
   }
}

exports.klickedmeter = async (user,id)=>{
  if(!id) throw 'Senders id Required';

// console.log('userid',user._id);
// console.log('sernderid',id)
let result=await Chat.findOne({$or:[{userId:user._id,idReceiver:id},{userId:id,idReceiver:user._id}]},{klickedMeter:1});
if(!result) throw "Chat Not Exist";
result=result.klickedMeter;
return {'klickedMeter':result};
}

exports.blockauser= async (user,body)=>{
  // console.log('User Id',user._id);
  // console.log('Reciver Id',body.idReceiver);
  if(!body.idReceiver){throw 'Id required'};
  
  let result= await Blocked.findOne({userId:user._id});
  //console.log('result',result);
  let obj={};
  if(!result)
  {

    obj.userId=user._id;
    obj.blockedUser=[body.idReceiver];
    let r= new Blocked(obj);
    let res= await r.save();
    return res;
  }
  let arr=[...result.blockedUser];
  let f=arr.find(o=>{return o==body.idReceiver});
  if(f) throw 'You already Block This User';
    let result1 = await Blocked.findByIdAndUpdate(result._id,{$addToSet:{blockedUser:body.idReceiver}},{new:true});
    if(!result1) throw msg.userNotFound;
    return {result:result1};
}

exports.unBlockauser =async (user,id)=>{
if(!id) throw msg.invalidId;
let res= await Blocked.findOneAndUpdate({userId:user._id},{$pull:{blockedUser:id}});
if(!res) throw msg.NotExist;
return {'result':'Ok'};
}
exports.getBlocked =async (user)=>{
 let res=await Blocked.findOne({userId:user._id}).populate('blockedUser',{firstName:1,address:1,DOB:1,audioDescription:1,profileImage:1,kycVerified:1});
 if(!res ) throw msg.userNotFound; 
 return res;
}


exports.blockedBy=async(roleId,id)=>{
  if(!id) throw msg.invalidId;
  let res= await Blocked.find({blockedUser:id},{blockedUser:0,_id:0,createdAt:0,updatedAt:0}).populate('userId',{firstName:1,phone:1,email:1})
  if(!res) throw msg.NotExist;
  return res;
}

// exports.searchChats = async (user,socket,params) => {
//   checkIfAdmin(user.roleId)
// // console.log("me hoo don")
//   let chatUser =  await Chat.find({userId:params.userId},{outgoingMessages:0,incomingMessages:0})
//   return{
//     result:chatUser
//   }
// }

// exports.allChats = async (user,socket) => {
//   checkIfAdmin(user.roleId)
//   let chatUser =  await Chat.find({userId:{ $ne: user.id }},{outgoingMessages:0,incomingMessages:0})
//   return{
//     result:chatUser
//   }
// }

// exports.ChatDocument = async (user,socket,params) => {
//     if(!params.id){throw msg.requiredChatId}
//       let chatUser = await Chat.findById({_id:params.id})
//       let array = await chatUser.outgoingMessages;
//   let array1 = await array.concat(chatUser.incomingMessages);
//   array= await array1.sort(function(a,b){
//     return new Date(b.createdAt) - new Date(a.createdAt);
//   });
//   array = array.reverse()
// //  // console.log(array);
//       return{
//         result:array
//       }
// }


