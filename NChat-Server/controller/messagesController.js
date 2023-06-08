const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};



module.exports.addMsg = async (req, res, next) => {
	try {
		const { from, to, message } = req.body
		const data = await Messages.create({
			message: { text: message },
			users: [from, to],
			sender: from,
		})
		if (data) {
			return res.json({ msg: "信息已经成功发送" })
		}
		return res.json({ msg: "信息存储失败" })
	} catch (error) {
		next(error)
	}
}
