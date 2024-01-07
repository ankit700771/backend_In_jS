//wrapper function

const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler()).catch((err) => next(err));
  };
};

export { asyncHandler };

// or this way we write a wrapper function

// const asyncHandler = (fn) => async (req , res , next) => {
//     try {
//         await fn(req , res , next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message: err.message
//         })

//     }
// }
