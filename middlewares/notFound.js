// middlewares/notFound.js

const notFound = (req, res, next) => {
  res.status(404);
  res.json({
    success: false,
    message: `404 🔍 Not Found - ${req.originalUrl}`,
  });
};

export default notFound
