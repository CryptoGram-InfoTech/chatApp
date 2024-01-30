var Emitter = require("events").EventEmitter;
var emit = Emitter.prototype.emit;
const { User } = require("../user/models/user.model");

const { Chat } = require("../chat/model/chat.model");
const { speedChat } = require("../speedChat/model/speedChat.model");
const { chatOnlineUser } = require("../chat/model/onlineUsers.model");

module.exports = function (io) {
  io.on("connection", async (socket) => {
    var transports= ["polling"];
    var sockets = {};
    var users = []
    
    console.log("Console from realTime.js user is connection ", socket.id);
    // socket.on('pong', function (data) {           //08/09/2018 => 11:56 commented
    //     console.log("Pong received from client");
    //   });
    // await socket.on("username", (userName,userId) => {
    //   socket.join(socket.id);
    //   users={
    //     id: socket.id,
    //     username: userName,
    //     userId:userId
    //   }
    //   // let user = new chatOnlineUser(users);
    //   //           user = user.save();

    //   // let len = users.length;
    //   // len--;
    //   //   console.log("users",users)
    //   io.emit("userList", users);
    // });

    // let socket5 = 
    await socket.emit("hello", {
      greeting: "hello parikshit",
      socketID: socket.id,
    });
    // console.log(socket5)

    await socket.on("onlineUsers",()=>{
        chatOnlineUser.find({online:true},(err,res)=>{
        if(res){
          io.emit("onlineUser",res)
        }
       })
     
    })
    await socket.on("checkOnline",(user)=>{
       chatOnlineUser.findOne({userId:user.userId},(err,res)=>{
      if(res){
        let value = {status:false}
        io.emit("onlineStatus",value)
      }
      else{
        let value = {status:false}
        io.emit("onlineStatus",value)
      }
     })
   
  })
 
    await socket.on("messages", async(user,chatId) => {

      console.log("socket is working")
      //    console.log("inside etst resle time", data);
      let message = [];
      //   let chatUser = await Chat.findOne({userId:user._id}).sort({_id:-1}).limit(1);

      let result = await Chat.findOne({_id:chatId}).sort({_id:-1}).limit(1);
      // console.log("inside etst resle time", result);

      // Chat.findOne({ username: data }
        if (result) {
          let array1 = result.outgoingMessages;
          let messageCount = array1.length;
          console.log("credential from env file",process.env.klickedMessageCount)
          let klickedPercentage = (messageCount/process.env.klickedMessageCount) * 100;
          if(klickedPercentage){
            klickedPercentage = 100;
          }
          console.log(klickedPercentage,"hii i am klicked meter")
          // let sender = await User.findOneAndUpdate({_id:user._id},{klickedMeter:klickedPercentage},{new:true,upsert:true})
          // let receiver =await  User.findOneAndUpdate({firstName:result.firstName},{klickedMeter:klickedPercentage},{new:true,upsert:true})
         
          // let array1 = array.concat(result[0].incomingMessages);
        //  let message2 = "me hu"
          let finalArray = array1.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          finalArray = finalArray.reverse()
          if (finalArray) {
            if (message.length == 0) {
              message.push({
                firstName: result.firstName,
                array: finalArray,
              });                                                                          
              // console.log("i am here 1", message);
              io.emit("messagesToAdmin", message);
            } else {
              // io.emit("messagesToAdmin", message2);
              // finalArray.push()
              // for (let i = 0; i < message.length; i++) {
              //   if (message[i].username === data) {
              //     console.log("i am here");
              //     abc = message.splice(i, 1);
              //     if (abc) {
              //       message.push({
              //         username: data,
              //         array: finalArray,
              //       });
              //       //       console.log("i am here 2", message);
              //       io.emit("messagesToAdmin", message);
              //     }
              //   } else {
                  // message.push({
                  //   firstName: data,
                  //   array: finalArray,
                  // });
                  //     console.log("i am here 3", message);
                  // io.emit("messagesToAdmin", message);
                // }
              // }
            }
            //   console.log("*****************************hello hello*********************************************",array)
          }
        }
      
    });


    // await socket.on("speedMessages", async(user,chatId) => {

    //   console.log("speed socket is working")
    //   //    console.log("inside etst resle time", data);
    //   let message = [];
    //   //   let chatUser = await Chat.findOne({userId:user._id}).sort({_id:-1}).limit(1);

    //   let result = await speedChat.findOne({_id:chatId}).sort({_id:-1}).limit(1);
    //   // console.log("inside etst resle time", result);

    //   // Chat.findOne({ username: data }
    //     if (result) {
    //       let array1 = result.outgoingMessages;
    //       // let messageCount = array1.length;
    //       // let klickedPercentage = (messageCount/process.env.klickedMessageCount) * 100;
    //       // let sender = User.findOneAndUpdate({_id:user._id},{$set:{klickedMeter:klickedPercentage}})
    //       // let receiver = User.findOneAndUpdate({firstName:result.firstName},{$set:{klickedMeter:klickedPercentage}})
    //       // let array1 = array.concat(result[0].incomingMessages);
    //     //  let message2 = "me hu"
    //       let finalArray = array1.sort(function (a, b) {
    //         return new Date(b.createdAt) - new Date(a.createdAt);
    //       });
    //       finalArray = finalArray.reverse()
    //       if (finalArray) {
    //         if (message.length == 0) {
    //           message.push({
    //             firstName: result.firstName,
    //             array: finalArray,
    //           });                                                                          
    //           //   console.log("i am here 1", message);
    //           io.emit("messagesToAdmin", message);
    //         } else {
    //           // io.emit("messagesToAdmin", message2);

    //           // finalArray.push()
    //           // for (let i = 0; i < message.length; i++) {
    //           //   if (message[i].username === data) {
    //           //     console.log("i am here");
    //           //     abc = message.splice(i, 1);
    //           //     if (abc) {
    //           //       message.push({
    //           //         username: data,
    //           //         array: finalArray,
    //           //       });
    //           //       //       console.log("i am here 2", message);
    //           //       io.emit("messagesToAdmin", message);
    //           //     }
    //           //   } else {
    //               // message.push({
    //               //   firstName: data,
    //               //   array: finalArray,
    //               // });
    //               //     console.log("i am here 3", message);
    //               // io.emit("messagesToAdmin", message);
    //             // }
    //           // }
    //         }
    //         //   console.log("*****************************hello hello*********************************************",array)
    //       }
    //     }
      
    // });



    
    // await socket.on("test", (data) => {
    //   console.log(
    //     "****************** inside etst resle time ***********************************",
    //     data
    //   );
    //   io.emit("autoLogin", data);
    // });
    // await socket.on("readChat", async(chat) => {
      
    //   // let result =  Chat.findOne({'outgoingMessage._id':chat.messageId},{$set:{read:true}}).sort({_id:-1}).limit(1);
    //   console.log("this is chat",chat)
    //   let result =  await Chat.findOneAndUpdate({_id: chat.chatId, outgoingMessages: {$elemMatch: {_id: chat.messageId}}},
    //     {$set: {'outgoingMessages.$.read': true}}, // list fields you like to change
    //     {'new': true});
    //     console.log("this is result query for read",result)
    //   io.emit("readData", result);
    // });
    
    // socket payment confirmation
    // await socket.on("paymentConfirmation", (data) => {
    //   console.log(
    //     "****************** final receipt of transaction ***********************************",
    //     data
    //   );
    //   io.emit("imtradeConfirmedPayment", data);
    // });
  });
};

// exports.attributes = {
//   name: 'socket'
// }
