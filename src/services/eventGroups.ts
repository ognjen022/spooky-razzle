export const eventGroups = Object.freeze({
  REQUESTED: 'requested',
  RECEIVED: 'received',
  REMOVED: 'removed',
  CLICKED: 'clicked',
  TOGGLED: 'toggled',
  CANCELLED: 'cancelled',
  ERRORED: 'errored',
  SELECTED: 'selected',
})

export interface Payload<T> {
  value: T
}

export interface Event<T> {
  readonly type: string
  readonly payload: Payload<T>
}

export interface EventSimple {
  readonly type: string
}
