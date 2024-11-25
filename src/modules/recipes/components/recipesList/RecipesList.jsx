import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from '../../../shared/components/header/Header';
import noData from '../../../../assets/images/no-data.svg';
import axios from 'axios';
import NoData from '../../../shared/components/noData/NoData';
import { axiosInstance, CATEGORY_URLS, imgBaseURL, RECIPES_URLS, TAGS_URLS, USER_RECIPES_URLS } from '../../../../services/urls/urls';
import DeleteConfirmation from '../../../shared/components/deleteConfirmation/DeleteConfirmation';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { toast } from 'react-toastify';

export default function RecipesList() {
  let {loginData} = useContext(AuthContext);

  const [recipesList, setRecipesList] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [tags , setTags] = useState();
  const [categories , setCategories] = useState();
  const [nameValue , setNameValue] = useState("");
  const [tagValue , setTagValue] = useState("");
  const [catValue , setCatValue] = useState("");


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true)};

    let getRecipes = async(pageNo ,pageSize,name,tag ,category) => {
      try {
       let response = await axiosInstance.get(RECIPES_URLS.GET_RECIPES,{params:{pageSize : pageSize,pageNumber : pageNo, name :name,
        tagId:tag ,categoryId :category
       }}
         );
      //  console.log(response.data)
       setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i) => i+1))
      
       setRecipesList(response.data.data);
      } catch (error) {
       console.log(error)
      }
     };

     let deleteRecipe = () => {
      try {
        let response = axiosInstance.delete(RECIPES_URLS.DELETE_RECIPE(selectedId)
      );
        toast.success('Item deleted successfuly');
        getRecipes()
      } catch (error) {
  
        console.log(error);
        toast.error(error.response.data.message);
      }
      
      handleClose()
    }
    const getTags = async() => {
      try {
        let response = await axiosInstance.get(TAGS_URLS.GET_TAGS);
        console.log(response);
        setTags(response?.data)
        // console.log(tags);
        
      } catch (error) {
        console.log(error)
      }
    };
    let getCategories = async() => {
      try {
       let response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES);
       console.log(response.data.data);
   
       setCategories(response.data.data);
      //  console.log(categories);
      } catch (error) {
       console.log(error)
      }
     };
     const getNameValue = (input) => {
      setNameValue(input.target.value);
      getRecipes(1,3,input.target.value,tagValue,catValue)
     }
     const getTagValue = (input) => {
      setTagValue(input.target.value);
      getRecipes(1,3,nameValue,input.target.value,catValue)
     }
     const getCatValue = (input) => {
      setCatValue(input.target.value);
      getRecipes(1,3,nameValue,tagValue,input.target.value)
     };

     let addToFav = async(id) => {
      try {
       let response = await axiosInstance.post(USER_RECIPES_URLS.ADD_TO_FAV,{
       recipeId:id}
         );
       console.log(response)
       
       
      } catch (error) {
       console.log(error)
      }
     };

     useEffect(() => {
      getRecipes(1,5);
      getTags();
      getCategories()
      
    }, []);
  return (
    <>
     
    <Header title={'Recipes Items'} 
    description={'You can now add your items that any user can order it from the Application and you can edit'}/>
    
      <DeleteConfirmation
      deleteItem={'Recipe'}
      deleteFun={deleteRecipe}
      show={show}
      handleClose={handleClose}
      />
    <div className=' d-flex justify-content-between p-4'>
      <h5>Recipes Table Details</h5>
      {loginData?.userGroup != 'SystemUser' ? 
      <Link to="/dashboard/recipes/new-recipe" className='btn btn-success'>Add New Recipe</Link>
      :"" }
    </div>
    <div className='p-4'>
      <div className="row mb-4" >
        <div className="col-md-6">
          <input type='text' placeholder='search here ...' className='form-control' onChange={getNameValue}/>
        </div>
        <div className="col-md-3">
          <select className='form-control' onChange={getTagValue}>
          <option value="">tag</option>
          {tags?.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <select className='form-control' onChange={getCatValue}>
            <option value="">category</option>
            {categories?.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
          </select>
        </div>
      </div>
      {recipesList.length > 0 ? (
      <table className="table table-striped">
      <thead >
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th>
          <th scope="col">Tag</th>
          <th scope="col">category</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {recipesList.map(recipe => 
          <tr key={recipe.id}>
          <td>{recipe.name}</td>
          <td className='img-table'>
            {recipe.imagePath ? <img className='w-25 h-25' src={`${imgBaseURL}/${recipe.imagePath}`} alt=''/> : <img className='w-25' src={noData}/>}
          </td>
          <td>{recipe.price}</td>
          <td>{recipe.description}</td>
          <td>{recipe.tag.name}</td>
          <td>{recipe.category[0]?.name}</td>
          {loginData?.userGroup != 'SystemUser' ? 
          <td>
          <i className="fa-solid fa-trash mx-3 text-success" onClick={()=> handleShow(recipe.id)} ></i>
          <Link to={`/dashboard/recipes/${recipe?.id}`}><i className="fa-regular fa-pen-to-square text-success"></i></Link>
          </td>
          :<td>
            <i className="fa-solid fa-heart text-danger" onClick={() =>addToFav(recipe.id)}></i>
          </td> }
        </tr>
        )}
        
      </tbody>
        </table> ): (<NoData/>)
      
    }
     
   
    
    <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {arrayOfPages.map((pageNo) =>(<li key={pageNo} onClick={() => getRecipes(pageNo, 5)}
     className="page-item"><a className="page-link" href="#">{pageNo}</a></li>))}
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    
    </div>
   
    
    </>
    
  )
}
