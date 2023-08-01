const Document = require("../model/Document");

const createNewDocument = async (req, res) => {
  try {
    const document = new Document({ userId: req.user._id });
    console.log(document);
    document.save();
    res.status(200).send(document);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createNewDocument,
};
