import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { fetchProductById } from "../product-list-page/productSaga"
import { rootState } from "../../store/store"
import { addToCart, fetchCart, patchCart } from "../cart-page/cartSaga"
import StatusComponent from "../../components/StatusComponent"
import { VENDOR } from "../../constants/roles"
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa"
import Button from "../../components/Button"



const Product = () => {

    const {id}= useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {selectedProduct} = useSelector((state:rootState)=>state.product)
    const [imageUrl, setImageUrl]  = useState<string>("")

    const { userDetails } = useSelector((state: rootState) => state.auth);

    const { cart } = useSelector((state: rootState) => state.cart);
    
      const cartItem = cart?.filter(
        (item) => item.productId == id
      )[0];
    
      const getUnsplashImage =async (productName:string):Promise<string> =>{
        const accessKey = 'cvUqmF4uT2jfEluTxjt8i26fcWENHVz1YnSk8LxjvT8'; 
      
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(productName)}&client_id=${accessKey}&per_page=1`
        );
      
        const data = await response.json();

        console.log(data)
      
        if (data.results && data.results.length > 0) {
          return data.results[0].urls.regular; 
        } else {
          return 'https://via.placeholder.com/150'; 
        }
      }
    


    useEffect(()=>{
        dispatch(fetchCart({ page: 1, perPage: 10 }));
       id && dispatch(fetchProductById(id))
       
    },[id])

    useEffect(()=>{
        selectedProduct?.name && getUnsplashImage(selectedProduct?.name).then((url)=>setImageUrl(url))

    },[selectedProduct])


    console.log(imageUrl)

  return (
    <>
   <div className=" w-full h-full p-5 px-10">
       <div className="my-3 flex flex-col justify-start gap-1 items-start relative">
        <span onClick={()=>navigate('/products')} className="absolute top-1 left-[-30px] cursor-pointer "><FaArrowLeft /></span>
          <h1 className="font-bold text-[18px] text-start">Product Details</h1>
          <p  className="text-sm cursor-pointer"><span onClick={()=>navigate('/')}>Home</span>/<span onClick={()=>navigate('/products')}>Products</span>/<span >Product details</span></p>
        </div>
      <div className="flex justify-start gap-3  mt-12">

        <div className="w-[500px] h-[500px] overflow-hidden rounded-[5px]">
            <img className="w-full max-w-full h-full max-h-full" src={imageUrl}/>
        </div>
        <div className="flex  flex-col justify-start gap-3"><h2>
          <span className="font-medium">Product Name: </span>{" "}
          {selectedProduct?.name}
        </h2>
        <p className="w-[600px]">
          <span className="font-medium">Description: </span>{" "}
          {selectedProduct?.description}
        </p>
        <p>
          <span className="font-medium">Price: </span> ${" "}{selectedProduct?.price}
        </p>
        <p className="flex gap-2 items-center">
          <span className="font-medium">Stock Status: </span>{" "}
          {selectedProduct?.stockStatus && <StatusComponent
            bgColor={`${
              selectedProduct?.stockStatus == "IN_STOCK"
                ? "#c0fcbd"
                : selectedProduct?.stockStatus == "LOW_STOCK"
                ? "#fdff93"
                : "#fcd6d6"
            }`}
            color={`${
             selectedProduct?.stockStatus == "IN_STOCK"
                ? "#029300"
                : selectedProduct?.stockStatus == "LOW_STOCK"
                ? "#8a8e00"
                : "#d10606"
            }`}
            content={selectedProduct?.stockStatus
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/(?<=\b)\w/g, (match: string) => match.toUpperCase())}
          />}
        </p>
        <p>
          <span className="font-medium">Sold Count: </span>{" "}
          {selectedProduct?.soldCount}
        </p>
        {selectedProduct?.inventoryId == userDetails?.inventoryId &&
          <p>
          <span className="font-medium">Quantity: </span>{" "}
          {selectedProduct?.quantity}
        </p>
        }
        <p>
          <span className="font-medium">Vendor: </span>{" "}
          {selectedProduct?.inventoryName}
        </p>
        <div className=" flex justify-start">
        {userDetails?.role == VENDOR &&
          selectedProduct?.inventoryId !== userDetails.inventoryId &&
          (cartItem ? (
            <div className="w-[100px] py-1 flex justify-around bg-primary-orange rounded-xl items-center text-primary-white">
              <span
                className={`cursor-pointer ${
                  cartItem.quantity > 1
                    ? "text-primary-white"
                    : "text-secondary-gray"
                }`}
                onClick={() => {
                  cartItem.quantity > 1 &&
                    dispatch(
                      patchCart({
                        itemId: cartItem.id,
                        data: { quantity: cartItem.quantity - 1 },
                        dispatchAction: () => {
                          dispatch(fetchCart({ page: 1, perPage: 10 }));
                        },
                      })
                    );
                }}
              >
                <FaMinus />
              </span>
              <span> {cartItem.quantity}</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(
                    patchCart({
                      itemId: cartItem.id,
                      data: { quantity: cartItem.quantity + 1 },
                      dispatchAction: () => {
                        dispatch(fetchCart({ page: 1, perPage: 10 }));
                      },
                    })
                  );
                }}
              >
                <FaPlus />
              </span>
            </div>
          ) : (
            <Button
              color={"primary-white"}
              bgColor="primary-orange"
              width="fit"
              btnContent={"Add to cart"}
              onClickCb={() => selectedProduct?.id && 
                dispatch(
                  addToCart({
                    productId: selectedProduct?.id,
                    quantity: 1,
                    dispatchAction: () =>
                      dispatch(fetchCart({ page: 1, perPage: 10 })),
                  })
                )
              }
            />
          ))}
      </div>
        
        </div>
        
      </div>
    
    </div>
    </>
  )
}

export default Product