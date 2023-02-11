export interface GoodsType {
  name: string,
  price: number,
  img: string,
  cate: string
}
export type Cate = {
  name: string,
  total: number,
}
export interface GoodsListReq {
  appId: string,
  plat: string
}
export interface Rate {
  score?: number
  avatar: string,
  username: string,
  rateTime: number|string,
  rateType: number,
  text: string
}
export interface Food {
  category: string,
  ctime: string,
  goodsDesc: string,
  id: number,
  imgUrl: string,
  name: string,
  price: number,
  rating: number,
  ratings: Array<Rate>,
  sellCount: number,
  num?:number
}
export interface GoodsItem {
  foods: Array<Food>
  name: string
  total?: number
}
export type GoodsListRes = {
  goodsList: Array<GoodsItem>
}
export interface Seller{
  avatar: string
  bulletin: string
  date:Array<string>
  deliveryPrice: number
  deliveryTime: number
  description: string
  id: number
  minPrice: number
  name: string
  pics: Array<string>
  score: number
  sellCount: number
  supports: Array<string>
}
export type shopInfoRes = {
  data: Seller
}
export interface Rating {
  avatar: string
  deliveryTime: string
  rateTime: number|string
  rateType: number
  recommend: Array<string>
  score: number
  text: string
  username: string
}
