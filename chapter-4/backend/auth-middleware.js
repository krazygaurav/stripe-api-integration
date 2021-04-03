const authMiddleware = (req, res, next) => {
  const userId = req.headers.authorization;

  if (!userId)
    return res
      .status(401)
      .json({ error: true, message: "Unauthorized Request" });

  req.userId = userId;
  next();
};

module.exports = authMiddleware;
