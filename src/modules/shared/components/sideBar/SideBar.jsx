import React, { useContext, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/3.png';
import { AuthContext } from '../../../../context/AuthContext';

export default function SideBar() {
  let {loginData} = useContext(AuthContext);
  const [isCollapse, setIsCollapse] = useState(false);
  let toggleCollapse = () => {
    setIsCollapse(!isCollapse)
  }

  const removeFromLocalStorage = () => {
    localStorage.removeItem('token'); // 'myItem' is the key you're removing
  };
  
 
  return (
    <>
    <div className='sidebar-container'>
    <Sidebar collapsed={isCollapse}>
      <Menu>
        <MenuItem icon={<img src={logo}/>}
        onClick={toggleCollapse}
         className="my-5 ms-2 logo-menu-item">
         
        </MenuItem>

      
        <MenuItem icon={<i className="fa fa-home" aria-hidden={true}></i>}
         component={<Link to='/dashboard'/>}>
        
        {/* <i class="fa-regular fa-house mx-3"></i> */}
         Home 
        </MenuItem>
        {loginData?.userGroup != 'SystemUser' ? 
        <MenuItem icon={ <i className="fa-solid fa-users mx-3"></i>}
        component={<Link to='/dashboard/users'/>}>
      
        Users
       </MenuItem>
       :"" }

        
        <MenuItem icon={<i className="fa-solid fa-table-list mx-3"></i>}
         component={<Link to='/dashboard/recipes'/>}>
        
         Recipes 
        </MenuItem>
         
         {loginData?.userGroup != 'SystemUser' ? 
        <MenuItem icon={<i className="fa-regular fa-calendar-days mx-3"></i>}
         component={<Link to='/dashboard/categories'/>}>
        
         Categories 
         </MenuItem>
          :"" }

         {loginData?.userGroup == 'SystemUser' ?  
         <MenuItem icon={<i className="fa-regular fa-calendar-days mx-3"></i>}
         component={<Link to='/dashboard/favourites'/>}>
        
         Favourites 
         </MenuItem>
        :"" }

        <MenuItem icon={<i className="fa-solid fa-lock mx-3"></i>}
        component={<Link to='/dashboard/changePassword'/>}
         >
        
         Change Password
        </MenuItem >
        <MenuItem onClick={removeFromLocalStorage} icon={<i  className="fa-solid fa-right-from-bracket mx-3"></i>}
         component={<Link to='/login'/>}>
        
         Logout 
        </MenuItem>

      </Menu>
    </Sidebar>
    </div>
  
    </>
  )
}
