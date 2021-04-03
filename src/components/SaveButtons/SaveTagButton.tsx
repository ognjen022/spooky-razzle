import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { ITag } from '../../services/content/tags/models'
import { selectSavedTagIds } from '../../services/content/tags/selectors'
import { tagsSaveTagEvent } from '../../services/content/tags/events'
import { RootState } from '../../services/RootState'
import { selectIsLoggedIn } from '../../services/userSecurity/token/selectors'
import { RootEventTypes } from '../../services/RootEventTypes'
import { push } from 'connected-react-router'

interface ISaveTagButtonProps {
  tag: ITag
  className: string
}

const SaveTagButton: React.FC<ISaveTagButtonProps> = (props) => {

  const dispatch = useDispatch()
  const savedTagIds = useSelector<RootState, string[]>(state => selectSavedTagIds(state))
  const isLoggedIn: boolean = useSelector<RootState, boolean>(state => selectIsLoggedIn(state.userSecurity.token))
  const uniqueId = uuidv4()

  const tag: ITag = props.tag
  const hasTagId = tag && tag.id
  const tagId = hasTagId ? tag.id : ''
  const [checked, setChecked] = useState(savedTagIds.includes(hasTagId ? tagId : ''))

  const onSave = () => {
    if (isLoggedIn) {
      dispatch(tagsSaveTagEvent(tagId))
    } else {
      dispatch(push('/login-back'))
    }
  }

  useEffect(() => {
    setChecked(savedTagIds.includes(hasTagId ? tag.id : ''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedTagIds]);

  return (<>
    {
      hasTagId &&
      <div className={props.className}>
        <input type="checkbox" name={`cbx_${tagId}_${uniqueId}`} id={`cbx_${tagId}_${uniqueId}`} className="is-toggle" checked={checked} onChange={onSave} />
        <label htmlFor={`cbx_${tagId}_${uniqueId}`}>{checked ? 'Saved' : 'Save'}</label>
      </div>
    }
  </>)
}

export default SaveTagButton