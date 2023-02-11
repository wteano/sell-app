/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/utils/request'
import { GoodsListReq, GoodsListRes, shopInfoRes } from '@/type'

export const goodsListApi = function (params: GoodsListReq): Promise<GoodsListRes> {
  return axios.get('/goods/goods_list', { params })
}
// export const shopInfoApi = function (params: GoodsListReq): Promise<GoodsListRes> {
//   return axios.get('/shop/info', { params })
// }
export const getRatingApi = function (): Promise<any> {
  return axios.get('/shop/ratings')
}
//
export const getSellerApi = function (): Promise<shopInfoRes> {
  return axios.get('/shop/seller')
}
