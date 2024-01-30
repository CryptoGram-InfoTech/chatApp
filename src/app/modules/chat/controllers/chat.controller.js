let business = require("../business/chat.business");

exports.chatToUser = async (req, res) => await business.chatToUser(req.user,req.io,req.body);

// 

// exports.check = async (req, res) => await business.check(req.user,req.io,req.body);

// 

exports.newChatDocument = async (req, res) => await business.newChatDocument(req.user,req.io,req.body);

exports.insertUser = async (req, res) => await business.insertUser(req.user,req.io,req.body);

exports.ejectUser = async (req, res) => await business.ejectUser(req.user,req.io);

exports.klickedmeter =async (req,res) => await business.klickedmeter(req.user,req.query.reciverid);

exports.blockauser =async req => await business.blockauser(req.user,req.body);

exports.unBlockauser=async req => await business.unBlockauser(req.user,req.query.id);

exports.getBlocked=async req => await business.getBlocked(req.user);
// exports.adminToUser = async (req, res) => await business.adminToUser(req.user,req.io,req.body);


// 

exports.getMessages = async (req, res) => await business.getMessages(req.user,req.io,req.query);

exports.blockedBy= async (req,res) => await business.blockedBy(req.user.roleId,req.query.id);


exports.oldChats = async (req, res) => await business.oldChats(req.user,req.body,req.io);

// exports.searchChats = async (req, res) => await business.searchChats(req.user,req.io,req.params);


// exports.allChats = async (req, res) => await business.allChats(req.user,req.io);

// exports.ChatDocument = async (req, res) => await business.ChatDocument(req.user,req.io,req.params);

