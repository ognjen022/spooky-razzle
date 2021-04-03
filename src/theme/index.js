import { createMuiTheme } from '@material-ui/core'

import palette from './palette'
import typography from './typography'
import overrides from './overrides'

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
})

export default theme
