(function() {
  switch (window.location.host) {
    case 'localhost:3000':
      window.API_URL = 'https://localhost:5001'
      break;
    case 'localhost:3100':
    case 'spookylive.dev-sites.co.nz':
      window.API_URL = 'https://spookylive-api.dev-sites.co.nz'
      break;
    case 'localhost:3200':
    case 'sideline.live.bornuat1.co.nz':
      window.API_URL = 'https://sideline-live-api.bornuat1.co.nz'
      break;
    case 'sideline-live.bornprod1.co.nz':
      window.API_URL = 'https://sideline-live-api.bornprod1.co.nz'
      break;
    case 'sideline.live':
      window.API_URL = 'https://api.sideline.live'
      break;
    default:
      window.API_URL = 'https://api.sideline.live'
      break;
  }
})();