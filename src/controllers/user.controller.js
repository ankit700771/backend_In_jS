import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "chai aur code",
  });
});

// function registerUser(req, res) {
//   res.status(200).json({
//     message: "Ok",
//   });
// }

export { registerUser };
