const notFound = (req, res) => {
  res.status(404);
  console.log("404", req.originalUrl)
  res.json({
    success: false,
    message: `404 🔍 Not Found - ${req.originalUrl}`,
  });
};

export default notFound
