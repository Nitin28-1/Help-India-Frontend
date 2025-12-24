import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, SearchIcon } from '@heroicons/react/outline';
import { TfiReload } from "react-icons/tfi";
import { userOperation } from '@/Services/apis';
import { apiconnector } from '@/Services/apiconnector';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import FollowBtn from './FollowBtn';
import { useSelector } from 'react-redux';

const {Search_Users} =userOperation

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const inputRef = useRef(null);
  const [searchTerm,setSearchTerm]=useState('');
  const [result,setResults]=useState([]);
  const {user}=useSelector(state=>state.auth);

  // Handle clicks outside to close the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        fetchUsers(searchTerm);
      } else {
        setResults([]); // clear if input empty
      }
    }, 400); // 400ms delay

    return () => clearTimeout(delayDebounce); // clean on re-run
  }, [searchTerm]);

  const fetchUsers = async (keyword) => {
    try {
      console.log(Search_Users)
      const res = await apiconnector("GET",`${Search_Users}?q=${keyword}`);
       setResults(res.data.users);
    } catch (error) {
      console.error('Search error:', error);
      setResults('');

    }
  };




  return (
    <nav className="bg-white h-[80px] border-b-[1px] border-gray-200 dark:bg-gray-900 lg:hidden">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="Brand_logo.png" className="w-20 h-14" alt="Flowbite Logo" />
        </a>

        {/* Search & Popup */}
        <div className="flex w-[65%] sm:w-[45%] md:order-2 relative">
          {/* Search Input */}
          <div className="relative w-full md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              className="block w-[100%] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              pl-aceholder="Search User....."
              onClick={() => setShowPopup(true)}
              value={searchTerm}
              onChange={(e)=> setSearchTerm(e.target.value)}
            />
          </div>

          {/* Pointing Div */}
          {showPopup && (
            <div
              ref={popupRef}
              className="absolute w-[100%]  overflow-scroll  rounded-xl translate-y-[38px] p-1  h-[400px] bg-white z-50"
            >{result.length > 0 ? (<>
      <div className="flex h-[85%] flex-col sm:gap-3 gap-4 p-3  ">          
      {result?.map((u) => {
          return (
            <div className="flex items-center justify-between " key={u._id}>
              <div className="flex items-center gap-2">
                <Link to={`/proifle/${u?._id}`}>
                  <Avatar>
                    <AvatarImage
                      className="rounded-full object-cover w-[50px] h-[50px] "
                      src={u?.profilePicture}
                      alt="post_image"
                      
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>

                <div className='w-[60%] '>
                  <h1 className="font-semibold text-sm">
                    <Link to={`/profile/${u._id}`}>{u?.username} </Link>
                  </h1>
                  <span className="text-gray-600 text-sm">
                    {u?.bio || "Bio Here...."}
                  </span>
                </div>
              </div>

              <span className="text-[#4c97ed] text-sm font-semibold hover:text-[rgb(0,0,255)] cursor-pointer " 
              >
               <FollowBtn SupporterId={user._id} targetUser={u?._id} />
              </span>
            </div>
          );
        })}
        </div>

            </>):( <div className="flex items-center flex-col h-full justify-center">
              <TfiReload className="text-[100px] animate-spin" />
              <h1 className="font-semibold m-2 mt-5">
                Please Search For Person Here.....
              </h1>
            </div>)}
             
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


