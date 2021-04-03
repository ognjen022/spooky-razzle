import palette from '../palette'


export default {
  root: {
    color: palette.icon,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)'
    },
    '&.Mui-checked .MuiIconButton-label': {
      color: palette.primary.main,
    }
  },
}
