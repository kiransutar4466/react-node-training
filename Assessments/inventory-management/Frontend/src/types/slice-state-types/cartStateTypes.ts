export type cartStateTypes = {
    isLoading:boolean,
    error:string|null,
    cart: cartItemType[]|null,
    details:deatilsType|null,
    isSuccess:boolean,
}

export type deatilsType = {
    page:number,
    next:number|null,
    prev:number|null,
    totalPages:number,
    totalPrice:number
}

export type cartItemType = {

      id: string,
      productId: string,
      productName: string,
      quantity: number,
      productPrice: number,
      productDescription:string

}