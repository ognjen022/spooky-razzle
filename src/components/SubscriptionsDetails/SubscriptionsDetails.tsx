import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './SubscriptionsDetails.module.scss'
import { RootState } from '../../services/RootState'
import { SubscriptionDetailsState, PurchaseHistory } from '../../services/payments/subscriptions/models'
import { ITag, ITagIndex, IStream } from '../../services/content/tags/models'
import * as _ from 'lodash'
import moment from 'moment'
import { selectSavedStreams, selectStreamByLivestreamEventId } from '../../services/content/tags/selectors'
import { selectGamePassPriceFormatted, selectWatchItAllPriceFormatted } from '../../services/payments/products/selectors'
import { Link } from 'react-router-dom'
import { unsubscribeRequestedEvent } from '../../services/payments/subscriptions/events'
import { selectProducts } from '../../services/config/selectors'

interface ISubscriptionsDetailsProps {

}

const SubscriptionsDetails: React.FC<ISubscriptionsDetailsProps> = (props) => {

  const purchaseHistoryItems = _.cloneDeep(useSelector<RootState, PurchaseHistory[]>(state => state.payments?.subscriptions?.items || []))
  const streams = useSelector<RootState, IStream[]>(state => state.content.tags.streams || [])
  const uuidIndex = useSelector<RootState, ITagIndex[]>(state => state.content.tags.uuidIndex || [])
  const tags = uuidIndex.map(index => index.tag)
  const stripeWatchItAllProductId = useSelector<RootState, string>(state => selectProducts(state.configuration).watch_it_all ?? '');
  const gamePassPriceFormatted = useSelector<RootState, string>(state => selectGamePassPriceFormatted(state.payments?.products, state.configuration))
  const watchItAllPriceFormatted = useSelector<RootState, string>(state => selectWatchItAllPriceFormatted(state.payments?.products, state.configuration))


  const dispatch = useDispatch();
  const onUnsubscribe = () => {
    dispatch(unsubscribeRequestedEvent())
  }
  purchaseHistoryItems?.forEach((purchaseHistoryItem: PurchaseHistory) => {
    // item.product_id === tag.stripeProductId ? item = { ...item, tagName: tag.name } : item
    const matches = tags.filter(tag => tag.stripeProductId === purchaseHistoryItem.product_id)
    if (purchaseHistoryItem.product_id === stripeWatchItAllProductId) {
      purchaseHistoryItem.tagName = 'Watch It All'
      purchaseHistoryItem.price = `${watchItAllPriceFormatted}/month`
    } else if (matches && matches.length > 0) {
      purchaseHistoryItem.tagName = matches[0].name
      purchaseHistoryItem.price = '$29.95'
    }

    if (purchaseHistoryItem.subscriptionType === 'GamePass') {

      let livestreamEventId = purchaseHistoryItem.product_id?.split('|')[0]

      let match = selectStreamByLivestreamEventId(streams, livestreamEventId || '')
      purchaseHistoryItem.tagName = match?.name || 'Game Pass (unknown)'
      purchaseHistoryItem.price = gamePassPriceFormatted
    }
  })

  // tableData.pop()

  return (
    <table className={styles['subscriptions-details-table']}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Purchased</th>
          <th>Price</th>
          <th>Expiry</th>
        </tr>
      </thead>
      <tbody>
        {purchaseHistoryItems?.map((item: PurchaseHistory, index) =>
          <tr key={index}>
            <td>{item.tagName}</td>
            <td>{moment(item.start).format('L')}</td>
            <td>{item.price}</td>
            <td>
              {(item.subscriptionType === 'WatchItAll' && item.expiry !== 'Cancelled') &&
                <Link to='#' onClick={onUnsubscribe}>{item.expiry}</Link>
              }
              {(item.subscriptionType !== 'WatchItAll' || (item.subscriptionType === 'WatchItAll' && item.expiry === 'Cancelled')) &&
                item.expiry
              }
            </td>
          </tr>)}
      </tbody>
    </table>

  )
}

export default SubscriptionsDetails
