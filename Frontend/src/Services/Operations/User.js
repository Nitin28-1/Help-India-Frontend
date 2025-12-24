import { toast } from "sonner";
import { apiconnector } from "../apiconnector";
import { userOperation } from "../apis";
import { useDispatch } from "react-redux";
import { setSuggestedUsers, setUserLocation, setUserProfile } from "@/redux/authSlice";
import { useEffect } from "react";


 const {
       LOGIN_API,
    REGISTER_API, 
    LOGOUT_API,
    GET_PROFILE,
    EDIT_PROFILE,
    SUGGEST,
    SUPPORT_OR_UNSUPPORT,
 } = userOperation;

 export async function Register(input)
 {  
    
        try {
             
            const response= await apiconnector("POST",REGISTER_API,input,{
                headers: {
                    "Content-Type": 'application/json',
                  },
                  withCredentials: true,  
             });
    
             if(!response.data.success)
             {
                throw new error(response.data.message);
            }

            //("User Register SuccessFully")
            toast.success("User Registered SuccessFully...");
    
        } catch (error) {
    
            //(error);
            toast.error("User Already Registered With This email..");
            
        }

    }


   
 export async function login(input)
 {  
        try {
             
            const response= await apiconnector("POST",LOGIN_API,input,{
                headers: {
                    "Content-Type": 'application/json',
                  },
                  withCredentials: true,  
             });
    
             if(!response.data.success)
             {
              //(response);
                throw new error(response?.data?.message);

            }

            toast.success("User Login SuccessFully");

            return response.data.userData;
    
        } catch (error) {
    
            //(error);
            
            toast.error(error.response.data.message);
            
        }

    }
   
 
export async function logout() {

        try {
             
            const response= await apiconnector("GET",LOGOUT_API,{
                headers: {
                    "Content-Type": 'application/json',
                  },
                  withCredentials: true,  
             });
    
             if(!response.data.success)
             {
                throw new error(response.data.message);
            }

            toast.success("User LogOut SuccessFully");

           return true;
    
        } catch (error) {
    
            //(error);
            return false;
        }

    }


export const useGetAllSuggestedUser = () => {
        const dispatch = useDispatch();
        useEffect(() => {
        
          const fetchSuggestedUser = async () => {
            try {
              const response = await apiconnector("GET", SUGGEST, {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              });

            
          
              if (response.data.success) {
               dispatch(setSuggestedUsers(response.data.suggestedUser));
              }

            } catch (error) {
              //(error);
            }
          };
         
          //("fecthing Data Or not");

          fetchSuggestedUser();
        },[]);
};


export const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    useEffect(() => {
    
      const fetchSuggestedUser = async () => {
        try {
          const response = await apiconnector("GET", `${GET_PROFILE}/${userId}/profile`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
      
          if (response.data.success) {
           dispatch(setUserProfile(response.data.user));
          }

        } catch (error) {
          //(error);
        }
      };
  
      fetchSuggestedUser();
    }, [userId]);
};


