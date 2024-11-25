import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/header/Header';
import NoData from '../../../shared/components/noData/NoData';
import { axiosInstance, imgBaseURL, USERS_URLS } from '../../../../services/urls/urls';
import noData from '../../../../assets/images/no-data.svg';
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../../../shared/components/deleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  // const [arrayOfPages, setArrayOfPages] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true)};

  let getUsers = async(pageSize, pageNo) => {
    try {
     let response = await axiosInstance.get(USERS_URLS.GET_USERS_LIST,{params:{pageSize : pageSize,pageNumber : pageNo}}
       );
     console.log(response.data.data)
    //  setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i) => i+1));
     setUsersList(response.data.data);
    } catch (error) {
     console.log(error)
    }
   };

   let deleteUser = () => {
    try {
      let response = axiosInstance.delete(USERS_URLS.DELETE_USER(selectedId)
      );

      toast.success('Item deleted successfuly');
      getUsers(20,3);
    } catch (error) {

      console.log(error);
      toast.error(error.response.data.message);
    }
    
    handleClose()
  };

 

   useEffect(() => {
    getUsers(20,3);
    
  }, []);
  return (
    <>
    <Header title={`Users List`} 
    description={'you can now add your items that any user can order it from the Application and you can edit'}/>
    <DeleteConfirmation 
      deleteItem={'User'}
      deleteFun={deleteUser}
      show={show}
      handleClose={handleClose}
      />
    <div className='  p-2'>
      <h5>Users Table Details</h5>
      <span>You can check all details</span>
    </div>
    <div className='p-4'>
    {usersList.length > 0 ? (
      <table className="table table-striped">
      <thead >
        <tr>
          <th scope="col">User Name</th>
          <th scope="col">Image</th>
          <th scope="col">Email</th>
          <th scope="col">Country</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map(user => 
          <tr key={user.id}>
          <td>{user.userName}</td>
          <td className='img-table'>
            {user.imagePath ? <img className='w-25 h-25' src={`${imgBaseURL}/${user.imagePath}`} alt=''/> : <img className='w-25' src={noData}/>}
          </td>
          <td>{user.email}</td>
          <td>{user.country}</td>
          <td>{user.phoneNumber}</td>        
          <td>
          <i className="fa-solid fa-trash mx-3 text-success" 
          onClick={()=> handleShow(user.id)}
          >
          </i>
          <i className="fa fa-eye success"></i>
          </td>
        </tr>
        )}
        
      </tbody>
        </table> ): (<NoData/>)
      
    };
       
       {/* <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {arrayOfPages.map((pageNo) =>(<li key={pageNo} onClick={() => getUsers(pageNo, 50)}
     className="page-item"><a className="page-link" href="#">{pageNo}</a></li>))}
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
      </nav> */}
    </div>
    
    </>
  )
}
