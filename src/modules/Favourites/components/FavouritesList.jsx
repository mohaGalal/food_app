import React, { useEffect, useState } from 'react'
import Header from '../../shared/components/header/Header'
import { axiosInstance, imgBaseURL, USER_RECIPES_URLS } from '../../../services/urls/urls';
import NoData from '../../shared/components/noData/NoData';
import noData from '../../../assets/images/no-data.svg';

export default function FavouritesList() {
    const [favList, setFavList] = useState([]);

    let getFavList = async() => {
        try {
         let response = await axiosInstance.get(USER_RECIPES_URLS.GET_FAVOURITES,{
         }
           );
         console.log(response)
         setFavList(response.data.data)
         
        } catch (error) {
         console.log(error)
        }
       };
      

    let removeFromFav = async(id) => {
        try {
         let response = await axiosInstance.delete(USER_RECIPES_URLS.REMOVE_FROM_FAV(id),{
         }
           );
         console.log(response)
         
        getFavList();
        } catch (error) {
         console.log(error)
        }
       };

       useEffect(() => {
        getFavList();
       
       }, [])
       
  return (
    <>
     <Header title={'Favouirtes Items'} 
    description={'You can now add your items that any user can order it from the Application and you can edit'}/>
    <div className='container-fluid'>
    <div className="row p-5">
    {favList.length > 0 ? 
        favList.map(favItem => 
        <div key={favItem.id} className='col-md-4 shadow-lg'>
          <div className="item">
          {favItem.recipe.imagePath ? <img className='w-25 h-25' 
          src={`${imgBaseURL}/${favItem.recipe.imagePath}`} alt=''/> : <img className='w-100' src={noData}/>}
          <div className="caption d-flex justify-content-between p-3">
            <div className="title">
            <h4>{favItem.recipe.name}</h4>
            <p>{favItem.recipe.description}</p>
            </div>
            <i className="fa-regular fa-heart text-danger fa-2x" onClick={() => removeFromFav(favItem.id)}></i>
          </div>
            
            
          </div>

        </div>
       ): (<NoData/>)
      
    }
    </div>
    </div>
   
    </>
  )
}
