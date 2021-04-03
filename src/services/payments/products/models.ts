
export interface Product {
  name: string
  pricing: number
  productId: string
  type: string
}

export interface ProductsState {
  list: Product[] | undefined
}