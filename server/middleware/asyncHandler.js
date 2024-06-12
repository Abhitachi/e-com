const asyncHandler = (fn) => (req, res, next) => {
  // console.log(req, "req");
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
