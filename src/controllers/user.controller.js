import { asyncHandler } from "../utils/asyncHandler.js";

// this is help to handel error
import { ApiError } from "../utils/ApiError.js";

//this user directly talk with the data base
import { User } from "../models/user.model.js";

//used for upload image on cloudinary
import { uploadOnCloudinary } from "../utils/cloudnary.js";

// for sending response in the pre define structure
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // take name email other info about ragister
  // validation - not empty
  // check if user all ready exists: throug username or email
  // check for images and avatar
  // upload then into cloudinary
  // create user object
  // store into data base
  // remove password and refresh token field from the response
  // check for user creation
  // return response or send error

  //get user data
  const { fullName, email, username, password } = req.body;

  //check fullName email username password is empty or not
  // apply sigle if else or

  // if (fullName === "") {
  //   throw new ApiError(400, "Full Name is required");
  // }

  //this way
  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // here we check that user allready exit or not based on username or email
  const exitedUser = await User.findOne({
    //this is a syntax for apply or operator
    $or: [{ username }, { email }],
  });

  //checking user exist or not
  if (exitedUser) {
    throw new ApiError(
      409,
      "user are all ready exist with this user name or email"
    );
  }

  // files access are get by multer package and getting path
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  //checking avatar is present or not
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is are required");
  }

  //upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  //check avatar hai ya nhi
  if (!avatar) {
    throw new ApiError(400, "avatar file is required");
  }

  //create entry into database
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // check hai to lo nhi to empty store karo
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    //kya kya nhi chahiya usko -sign ke sath likho by defoult pura selct hota hai
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Somthing went wrong !!");
  }

  //sending res

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User register successfully"));
});

// function registerUser(req, res) {
//   res.status(200).json({
//     message: "Ok",
//   });
// }

export { registerUser };
