const signUp = (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  res.send({ success: true });
};

module.exports = {
  signUp,
};
