const io = require("../index");
const Document = require("../model/Document");

const createNewDocument = async (req, res) => {
  try {
    const document = new Document({ userId: req.user._id });
    document.save();
    res.status(200).send(document);
  } catch (err) {
    console.log(err);
  }
};

const getAllDocs = async (req, res) => {
  try {
    const docs = await Document.find({ userId: req.user._id });
    res.status(200).send(docs);
  } catch (err) {
    console.log(err);
  }
};
const fetchContent = async (req, res) => {
  try {
    const docs = await Document.findOne({ _id: req.params.id });
    res.status(200).send(docs);
  } catch (err) {
    console.log(err);
  }
};

const saveContent = async (req, res) => {
  try {
    const docs = await Document.findOneAndUpdate(
      { _id: req.params.id },
      { content: req.body.content }
    );

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createNewDocument,
  getAllDocs,
  fetchContent,
  saveContent,
};
