import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem, emptyCart, fetchCart, patchCart } from "./cartSaga"
import { rootState } from "../../store/store"
import Button from "../../components/Button"
import { FaMinus, FaPlus } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Modal from "../../components/Modal"
import ConfirmForm from "../../components/ConfirmForm"
import { placeOrder } from "../orders-page/ordersSaga"
import TableControllers from "../../components/TableControllers"
import { useNavigate } from "react-router"



const CartPage = () => {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalReason, setModalReason] = useState('')
  const [pageNum, setPageNum] = useState(1)

  const dispatch = useDispatch()
  const {cart, details} = useSelector((state:rootState)=>state.cart)
  const navigate = useNavigate()

  useEffect(()=>{

      dispatch(fetchCart({page:pageNum,perPage:10}))
    
  },[pageNum,dispatch])

  console.log(cart)

  const grandTotal = cart?.reduce((acc, item)=>{acc=acc+item.productPrice*item.quantity; return acc},0)

  return (


    <>
     {modalReason == "emptyCart" && (
        <Modal
          isVisible={isModalVisible}
          toggleIsVisibleCb={() => setIsModalVisible(false)}
          childComponent={
            <ConfirmForm
              message="Are you sure, you want to Empty cart?"
              buttonContent={"Empty Cart"}
              cancelCb={() => setIsModalVisible(false)}
              actionCb={() => {dispatch(emptyCart(()=>dispatch(fetchCart({page:1,perPage:10})))); setIsModalVisible(false)}}
            />
          }
        />
      )}

<div className="w-full h-full max-h-full overflow-y-scroll px-5">

    

<div className="my-3">
  <h1 className="font-bold text-[18px] text-start">Cart</h1>
  <p className="text-sm cursor-pointer"><span onClick={()=>navigate('/')}>Home</span>/<span onClick={()=>navigate('/cart')}>Cart</span></p>
</div>
{cart &&  <>

  {cart?.length>0 && <div className="flex w-full justify-between gap-3 my-2 mt-12">
  <Button onClickCb={()=>{setIsModalVisible(true) ; setModalReason("emptyCart")}} btnContent={"Empty Cart"} bgColor="button-blue" color="primary-white" width="fit"/>
  <div className="flex justify-end gap-3 items-center"> 
    {cart && <div className="flex justify-end  font-medium "> <span className="w-[200px] text-start ">Grand Total: <span className="text-dark-orange"> ${" "}{grandTotal?.toFixed(2)}</span></span></div>}
    <Button onClickCb={()=>{dispatch(placeOrder(()=>dispatch(fetchCart({page:1,perPage:10})))); }} btnContent={"Place Order"} bgColor="dark-orange" color="primary-white" width="fit"/>
  </div>
  </div>}
  
  
   {cart?.length==0&&<div className="h-10"></div>}
  <div className="w-full border-x-[1px]  border-table-border bg-sidebar-bg overflow-x-scroll rounded-t-[5px] min-h-fit">
    <div className="w-full flex justify-between gap-2 px-5 text-start  h-10 items-center font-medium bg-header-bg border-table-border border-y-[1px] text-text-dark" >
          <span className="w-[50px]">Sr no.</span>
          <span className="w-[150px]"> Product Name</span>
          <span className="w-[300px]"> Product Description</span>
          <span className="w-[150px]"> Product Price</span>
          <span className="w-[100px]"> Quantity</span>
          <span className="w-[100px] text-center flex justify-center items-center">Actions</span>
    </div>
       {cart && cart.length>0 ? 
       cart?.map((cartItem,key)=><div key={key} className="w-full flex justify-between gap-2 p-5 text-start bg-primary-white  my-2   border-table-border border-b-[1px]  min-w-fit ">
          <span className="w-[50px]">{key+1}</span>
          <span className="w-[150px]"> {cartItem.productName}</span>
          <span className="w-[300px]"> {cartItem.productDescription.slice(0,30)} {cartItem.productDescription.length>30 && "..."}</span>
        <span className="w-[150px]"> ${" "}{cartItem.productPrice}</span>
        <div className="w-[100px] flex justify-around bg-secondary-white rounded-xl items-center">
        <span className={`cursor-pointer ${cartItem.quantity>1 ? 'text-primary-black' : 'text-secondary-gray'}`} onClick={()=>{ cartItem.quantity>1 && dispatch(patchCart({itemId:cartItem.id, data:{quantity:cartItem.quantity-1} , dispatchAction:()=>{dispatch(fetchCart({page:1,perPage:10}))}})); }}><FaMinus /></span>
        <span >{cartItem.quantity}</span>
        <span className="cursor-pointer" onClick={()=>{dispatch(patchCart({itemId:cartItem.id, data:{quantity:cartItem.quantity+1} , dispatchAction:()=>{dispatch(fetchCart({page:1,perPage:10}))}})); }} ><FaPlus /></span>
        </div>
        <span className="w-[100px] text-center flex justify-center items-center cursor-pointer text-[20px] relative" title="Remove Item" onClick={()=>{dispatch(deleteCartItem({id:cartItem.id, dispatchAction:()=>{dispatch(fetchCart({page:1,perPage:10}))}}))}}><MdDelete/></span>
        
    </div>) : <span className="flex justify-center items-center border-table-border border-b-[1px] py-2 bg-primary-white">Your cart is empty.</span>}
  </div>
  
  {details && (
      <TableControllers
        nextPageCb={() => {
          setPageNum((prev) => prev + 1);
        }}
        prevPageCb={() => {
          setPageNum((prev) => prev - 1);
        }}
        pageNum={details?.page}
        totolPages={details?.totalPages}
      />
    )}


</>
  
  }  
 
 
  
</div>
    </>
    
    
  )
}

export default CartPage