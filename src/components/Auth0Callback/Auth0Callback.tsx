import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { TokenResponse } from '../../services/userSecurity/token/models'
import { tokenReceivedEvent } from '../../services/userSecurity/token/events'

interface ICopyStatementProps {
  text: string;
  image?: string;
}

const Auth0Callback: React.FC<ICopyStatementProps> = (props) => {

  let dispatch = useDispatch()

  useEffect(() => {

    let hash = window.location.hash

    if (hash && hash.length > 0) {

      const urlParams = new URLSearchParams('?' + window.location.hash.substring(1))
      let accessToken = urlParams.get('access_token')

      if (accessToken) {
        const event: TokenResponse = {
          accessToken: urlParams.get('access_token') || undefined,
          idToken: undefined,
          scope: urlParams.get('scope') || undefined,
          expiresIn: parseInt(urlParams.get('expires_in') || '0'),
          expiry: undefined,
          tokenType: urlParams.get('token_type') || undefined,
          error: urlParams.get('access_token') ? '' : 'No token in redirect',
          errorDescription: urlParams.get('access_token') ? '' : 'No token in redirect',
          refreshToken: urlParams.get('refresh_token') || undefined,
          redirectTo: undefined
        };

        dispatch(tokenReceivedEvent(event));
      }

      // dispatch(push('/'));
    }

  }, [dispatch]);

  return (
    <>
    </>
  )
}

export default Auth0Callback
