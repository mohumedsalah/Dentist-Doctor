module.exports = validator => {
  return (req, res, next) => {
    let error = validator(req).error;
    if (error) return res.status(400).json({ error, code: 400, result: null });
    // TODO: should mutate req.body
    next();
  };
};
