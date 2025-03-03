export type cardPropsType = {
     data:dataType,
     HandleViewDetails:(id:string)=>void ,
     toggleFavourite:(id:string)=>void 


}

export type dataType={
    id: string,
    title:string,
    description:string|null,
    url: string|undefined,
    urlToImage:string|null|undefined,
    publishedAt: string,
    isFavourite: boolean,
}