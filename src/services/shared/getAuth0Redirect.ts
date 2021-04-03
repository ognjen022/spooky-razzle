export enum SocialProvider {
  Google,
  Facebook
}

const getConnection = (provider: SocialProvider) => {
  switch (provider) {
    case SocialProvider.Google:
      return 'google-oauth2';
    case SocialProvider.Facebook:
      return 'facebook'
  }
}

const getAuth0BaseUrl = () => {
  switch (window.location.host) {
    case 'localhost:3000':
    case 'localhost:3100':
    case 'localhost:3200':
    case 'spookylive.dev-sites.co.nz':
      return 'https://spookylive-dev.us.auth0.com';
    case 'sideline.live.bornprod3.co.nz':
    case 'sideline.live':
      return 'https://sideline-live.au.auth0.com';
  }
}

const getAuth0ClientId = () => {
  switch (window.location.host) {
    case 'localhost:3000':
    case 'localhost:3100':
    case 'localhost:3200':
    case 'spookylive.dev-sites.co.nz':
      return '7iNSxmSt9LvmGXjPDa9drVmCNimCSpvZ';
    case 'sideline.live.bornprod3.co.nz':
    case 'sideline.live':
      return '5WI69J4pQSW2KUaejy200A8iRaDSHeOI';
  }
}

const getCallback = (provider: SocialProvider) => {
  switch (provider) {
    case SocialProvider.Google:
      return 'google-callback';
    case SocialProvider.Facebook:
      return 'facebook-callback'
  }
}

export const getAuth0Redirect = (provider: SocialProvider) => {
  return `${getAuth0BaseUrl()}/authorize?response_type=token&client_id=${getAuth0ClientId()}&connection=${getConnection(provider)}&redirect_uri=${window.location.protocol}//${window.location.host}/${getCallback(provider)}&scope=openid%20profile%20email`;
}