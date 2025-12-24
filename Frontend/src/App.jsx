import Login from './Components/Login'
import Signup from './Components/Signup'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import MainLayout from './Components/Core/MainLayout'
import  Home  from './Components/Core/Home'
import Profile from './Components/Core/Profile'
import Posts from './Components/Common/Posts'
import EditProfile from './Components/Core/EditProfile'
import ChatPage from './Components/Core/ChatPage'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setOnlineUsers } from './redux/chatSlice'
import { setSocket } from './redux/socketSlice'
import { setLikeNotification } from './redux/rtnSlice'
import { ProtectedRoute } from './Components/Common/ProtectedRoute'


const browserRouter=createBrowserRouter([
  {
    path:"/",
    element: <ProtectedRoute>  <MainLayout/> </ProtectedRoute>,
    children:[
      {
        path:'/',
        element: <ProtectedRoute><Home/></ProtectedRoute>
      },
      {
        path:'/profile/:id',
        element:<ProtectedRoute><Profile/></ProtectedRoute> 
      },
      {
        path:'/account/edit',
        element:<ProtectedRoute><EditProfile/></ProtectedRoute>
      },
      {
        path:'/chat',
        element:<ProtectedRoute> <ChatPage/> </ProtectedRoute>
      }
    ]
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  }

])

function App() {

  const {user}=useSelector(state=>state.auth);
  const {socket}=useSelector(state=>state.socketio)
  const dispatch=useDispatch();

  useEffect(()=>
  {
     if(user){
      const socketio=io('http://localhost:8000',{
        query:{
          userId:user?._id
        },
        transports:['websocket']
      });
   
      dispatch(setSocket(socketio))

      socketio.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification',(notification)=>{
        dispatch(setLikeNotification(notification))
      })

      return ()=>{
        socketio.close();
        dispatch(setSocket(null))
      }
     }
     else if(socket)
     {
      socket?.close();
      dispatch(setSocket(null))
     }

  },[user,dispatch])
  

  return (
    <>
      
      <RouterProvider router={browserRouter} />

    </>
  )
}

export default App
