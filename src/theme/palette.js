import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#000000'

const darkBlue = '#1c2b4a'

export default {
  black,
  white,
  // primary: {
  //   contrastText: white,
  //   dark: colors.indigo[900],
  //   main: colors.indigo[500],
  //   light: colors.indigo[100]
  // },
  brand: darkBlue,
  highlight: '#D6DD37',
  primary: {
    contrastText: white,
    main: darkBlue
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  success: {
    main: colors.green[600],
  },
  text: {
    primary: darkBlue,
    secondary: darkBlue,
    tertiary: colors.grey[500],
    link: colors.blue[600],
    dark: colors.grey[500],
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#F4F6F8',
    secondary: '#f1f1f1',
    tertiary: '#f4f4f4',
    paper: white,
    grey: colors.grey[400],
  },
  divider: colors.grey[200],
}
