import { asyncHandler } from "../utils/asyncHandler.js"
import { APIErrors } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { APIResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler( async (req, res) => {
    
    const {fullName, email, username, password } = req.body;
    console.log("email: ", email);

    // checking single fiels like this
    // if(firstName === ""){
    //     throw new APIErrors(400, "fullname is required.")
    // }

    // or can all the fields in single if like this

    if(
        [fullName, email, username, password].some((field) => {
            return field?.trim() === ""
        })
    ){
        throw new APIErrors(400, "All fields are required.")
    }

    const existedUser = User.findOne({
        $or : [{ username }, { email }]
    })

    if(existedUser){
        throw new APIErrors(409, "User with email or username already exists.")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new APIErrors(400, "Avatar file is required.")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const coverImage = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar){
        throw new APIErrors(400, "Avatar file is required.")
    }

    const user = await User.create({
        fullName,
        avatar: avatar?.url,
        converImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })


    const isCreatedUser = await User.findById(user?._id).select(
        "-password -refreshToken -"
    )

    if(!isCreatedUser){
        throw new APIErrors(500, "Something went wrong while registering the user.")
    }

    return res.status(201).json(
        new APIResponse(200, isCreatedUser, "User Registered Successfully.")
    )

} )

export { registerUser }