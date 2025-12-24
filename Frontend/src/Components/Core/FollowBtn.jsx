import { setAuthUser } from '@/redux/authSlice';
import { apiconnector } from '@/Services/apiconnector';
import { userOperation } from '@/Services/apis';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';


const {SUPPORTORUNSUPPORT}=userOperation;

function FollowBtn({SupporterId,targetUser}) {
    
    const { user } = useSelector((state) => state.auth);
    const dispatch=useDispatch();

    const handleFollowUnfollowRequest=async(SupporterId ,targetUser)=>
        {

            console.log(SupporterId,targetUser);
      
          try {
            
            const res=await apiconnector("POST",SUPPORTORUNSUPPORT,{
              SupporterId ,targetUser
            },
            { withCredentials: true }
           );
           
           console.log("Follow after data handling ");
           console.log(res);
      
           if(res.data.follow == false)
           {
           
           dispatch(setAuthUser(res.data.user));
            toast.success('UnFollow User Successfully...');
           }
           else if(res.data.follow == true)
           {
           dispatch(setAuthUser(res.data.user));
            toast.success('Follow User Successfully...');
           }
      
          } catch (error) {
            console.log(error);
          }
        }
      
       

  return (
    <div onClick={()=>handleFollowUnfollowRequest(SupporterId,targetUser)}>
       {SupporterId !== targetUser ? (<>{user?.impacter.includes(targetUser) ? "Unfollow" : "Follow"}</>):(<></>)}</div>
  )
}

export default FollowBtn