'use client'
import { GetUserInfo } from "@/Utils/AuthenticationUtils"
import { UserDto } from "@/Utils/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, Update } from "@reduxjs/toolkit"

export const fetchUser = createAsyncThunk('user/fetchUser' , async() => {
    const response = await GetUserInfo()
    console.log("🚀 ~ fetchUser ~ response:", response)
    return response
})

interface UpdateUserDto{
    id : string,
    username ? : string,
    email? : string,
    image? : string
}

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user : {} as UserDto,
    loading : false,
    error : null as string | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<UpdateUserDto>) => {
      state.user = {...state.user , ...action.payload , _id : state.user._id}
    },
  },
  extraReducers : (builder) => {
    builder.addCase(fetchUser.pending , (state) => {
        state.loading = true
    })
    builder.addCase(fetchUser.fulfilled , (state , action) => {
        state.loading = false
        state.user = action.payload
    })
    builder.addCase(fetchUser.rejected , (state , action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load User'
    })
  }
})

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;