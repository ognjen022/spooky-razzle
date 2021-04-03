import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink, Link as RouterLink } from 'react-router-dom'
import { Toolbar, IconButton } from '@material-ui/core'
import AccountIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    minHeight: 74,
    //   background: theme.palette.dark,
  },
  brand: {
    display: 'flex',
  },
  navList: {
    display: 'flex',
    paddingTop: 4,
  },
  navItem: {
    padding: '5px 10px',
    animation: '0.3s all ease-out',
    '& > span': {
      // color: theme.palette.light,
      animation: '0.3s all ease-out',
    },
    '&:hover > span': {
      // color: theme.palette.white,
    },
  },
  filler: {
    flex: 1,
  },
  divider: {
    margin: theme.spacing(0, 2),
    width: 1,
    height: 34,
    opacity: 0.3,
    //   background: theme.palette.light,
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
    padding: theme.spacing(2),
    minWidth: 260,
  },
  avatar: {
    width: 26,
    height: 26,
    //   color: theme.palette.dark,
    fontSize: 12,
    //   background: theme.palette.light,
  },
  menuIcon: {
    //   color: theme.palette.light,
    animation: '0.3s all ease-out',
    '&:hover': {
      // color: theme.palette.white,
    },
  },
  menuPlusIcon: {
    //   color: theme.palette.light,
    transform: 'translateX(-5px)',
    animation: '0.3s all ease-out',
    '&:hover': {
      // color: theme.palette.white,
    },
  },
  menuDropIcon: {
    position: 'absolute',
    //   color: theme.palette.light,
    fontSize: 18,
    transform: 'translateX(10px)',
    animation: '0.3s all ease-out',
    '&:hover': {
      // color: theme.palette.white,
    },
  },
  menuBadge: {
    //   backgroundColor: theme.palette.brand,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  navLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: '0 5px',
    padding: '10px 5px',
    minWidth: '64px',
    //   color: theme.palette.light,
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
    '&:hover': {
      // color: theme.palette.white,
    },
    '& > span': {
      // color: theme.palette.light,
      animation: '0.3s all ease-out',
    },
    '&:hover > span': {
      // color: theme.palette.white,
    },
  },
  navLinkSelected: {
    //   color: theme.palette.white,
    '& > span': {
      // color: theme.palette.white,
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      bottom: '10px',
      left: '5px',
      width: 'calc(100% - 10px)',
      height: '1px',
      // background: theme.palette.white,
    },
  },
}))

const Navigation = () => {
  const classes = useStyles()

  const config = [
    {
      title: 'nav1',
      link: '/',
    },
    {
      title: 'nav1',
      link: '/',
    },
    {
      title: 'nav1',
      link: '/',
    },
  ]

  return (
    <div className="App">
      <Toolbar>
        <RouterLink className={classes.brand} to="/">
          {/* <Brand /> */} Logo
        </RouterLink>
        <div className={classes.filler} />
        <div className={classes.navList}>
          {config.map((item) => (
            <NavLink to={item.link} color="inherit" className={classes.navLink} activeClassName={classes.navLinkSelected}>
              {item.title}
            </NavLink>
          ))}

          <IconButton
            color="inherit"
            // onClick={onOpenMenu('account')}
            // data-cy="accountMenu"
          >
            <AccountIcon className={classes.menuIcon} />
          </IconButton>
        </div>
      </Toolbar>
    </div>
  )
}

export default Navigation
