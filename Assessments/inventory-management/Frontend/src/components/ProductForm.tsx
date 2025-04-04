import { ErrorMessage, Field, Form, Formik } from "formik";
import SmallLoader from "./SmallLoader";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../store/store";
import { ProductFormInputType } from "../types/slice-state-types/productStateTypes";
import { addProduct, patchProduct } from "../pages/product-list-page/productSaga";
import { prouductFromValidations } from "../yup-validations/productValidations";



const ProductForm = ({formData={ 
  name:"",
  description:"",
  quantity:"",
  price:"",
  categories:""}, title, selectedId}:{formData:ProductFormInputType, title:string, selectedId?:string}) => {

  
  const {allCategories, isLoading} = useSelector((state:rootState)=>state.product)

  const dispatch = useDispatch()

  return (
    <div className=" bg-primary-white rounded-xl border-1 p-5 w-fit">
    <h2 className="text-center mb-4 text-2xl font-medium">{title}</h2>
    <Formik
       initialValues={formData}

     validationSchema={prouductFromValidations}
       
     onSubmit={(values) => {

          if(title=="Add Product"){
            dispatch(addProduct({...values , categories: typeof values.categories == 'string' ?values.categories.split(', ') : values.categories}));
            
          }else if(title=="Edit Product" && selectedId){
            dispatch(patchProduct({formData:{...values , categories: typeof values.categories == 'string' ?values.categories.split(', ') : values.categories}, id:selectedId}));
          }

     
      }}
     >
      <Form className="flex flex-col w-fit"> 
        <div className="flex gap-3 mb-0">
        <div className="flex flex-col space-y-1 max-w-62 w-62 h-20 max-h-20">
        <label htmlFor="name">Product Name</label>
        <Field className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white" placeholder="Enter product name"  id="name" name="name" type="text" required={true} autoComplete="off"/>
        <ErrorMessage name="name" component="div"  className="text-xs w-full text-red-500"/>
        </div>
        <div className="flex flex-col gap-1 max-w-62 w-62 h-20 max-h-20">
        <label htmlFor="price">Price </label>
        <Field  className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white" placeholder="Enter the price in USD"  id="price" name="price" type="number" required={true} />
        <ErrorMessage name="price" component="div" className="text-xs w-full text-red-500" />
        </div>
        </div>


        <div className="flex gap-3 mb-4">
        <div className="flex flex-col gap-1 max-w-full w-full max-h-40  ">
        <label htmlFor="description">Description</label>
        <Field as={"textarea"} className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white min-h-10" placeholder="Enter description"  id="description" name="description" type="textarea" required={true} autoComplete="off"/>
        <ErrorMessage name="description" component="div"  className="text-xs w-full text-red-500"/>
        </div>
        </div>

        <div className="flex gap-3 mb-4">
        <div className="flex flex-col gap-1 max-w-62 w-62 h-20 max-h-20">
        <label htmlFor="quantity">Quantity</label>
        <Field  className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white" placeholder="Enter quantity"  id="quantity" name="quantity" type="number" required={true} autoComplete="off"/>
        <ErrorMessage name="quantity" component="div"  className="text-xs w-full text-red-500"/>
        </div>
        <div className="flex flex-col gap-1 max-w-62 w-62 h-20 max-h-20">
        <label htmlFor="categories">Category</label>
        <Field as={"select"} className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white" placeholder="Enter category"  id="categories" name="categories" type="select" required={true} >
            {allCategories.map((category,key)=><option  key={key} value={category}>{category}</option>)} <option value="red">Red</option>
             <option value="">Select Category</option>
             </Field>
        <ErrorMessage name="categories" component="div" className="text-xs w-full text-red-500" />
        </div>
        </div>
       
        <div className="flex w-full justify-center items-center">
        { isLoading ? <SmallLoader/> : <Button type="submit" btnContent={"Submit"} color="primary-white" bgColor="primary-orange" width={"[100px]"}/>}
        </div>

      </Form>
       

   </Formik>

</div>
  )
}

export default ProductForm