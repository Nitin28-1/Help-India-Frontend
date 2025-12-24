import { useGetAllMessages } from "@/Services/Operations/Message";
import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
 
    name:"auth",
    initialState:{
        user:null,
        suggestedUsers:[],
        userProfile:null,
        selectedUser:null,
         location:null,
         chatUser:[],
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.user=action.payload;
        },
        setSuggestedUsers:(state,action)=>
        {
            
            state.suggestedUsers=action.payload;
        },
        setUserProfile:(state,action)=>
        {
            state.userProfile=action.payload;
        },
        setSelectedUser:(state,action)=>
        {
            state.selectedUser=action.payload;
            
        },
        setUserLocation:(state,action)=>
        {
            state.location=action.payload;
        },
        setChatUser:(state,action)=>
        {
            state.chatUser=action.payload;
        }
    }

}); 

export const {setAuthUser,setSuggestedUsers,setUserProfile,setSelectedUser,setUserLocation,setChatUser}=authSlice.actions;
export default authSlice.reducer;