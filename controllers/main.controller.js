exports.redirect = (req, res, next) => {
  res.redirect("/api/user");
  next();
};
