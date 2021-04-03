import { selectProducts } from './../../config/selectors';
import { IConfigurationState } from './../../config/models';
import { ProductsState, Product } from './models'
import { RootState } from '../../RootState'
import { selectTag } from '../../content/tags/selectors'

export const selectGamePassPriceFormatted = (state: ProductsState, configuration: IConfigurationState): string => {
  let result: string = ''
  const products = selectProducts(configuration)

  state?.list?.forEach((product: Product) => {
    if (product.productId === products.game_pass && product.pricing && product.pricing > 0) {
      result = '$' + (product.pricing / 100).toString()
    }
  })

  return result
}


export const selectSeasonPassPriceFormatted = (state: RootState): string => {

  let result = '$29.95*'
  let selectedTagId = state.payments.purchase.tagId
  if (selectedTagId) {
    let tag = selectTag(state, selectedTagId)
    if (tag?.pricing && tag?.pricing !== null) {
      result = '$' + (tag.pricing / 100).toString()
    }
  }
  return result
}

export const selectWatchItAllPriceFormatted = (state: ProductsState, config: IConfigurationState): string => {
  let result: string = ''

  const products =  selectProducts(config) //getStripeWatchItAllProductId()

  state?.list?.forEach((product: Product) => {
    if (product.productId === products.watch_it_all && product.pricing && product.pricing > 0) {
      result = '$' + (product.pricing / 100).toString()
    }
  })

  return result
}