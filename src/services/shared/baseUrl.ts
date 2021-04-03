const baseUrlFunc = () => {
  // if (typeof window !== 'undefined') return window['API_URL']
  return 'https://api.sideline.live'
}

export const baseUrl = baseUrlFunc()
