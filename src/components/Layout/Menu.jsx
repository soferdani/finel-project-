import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    CssBaseline, 
    Divider, 
    Drawer, 
    Hidden, 
    IconButton, 
    AppBar, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Toolbar, 
    Typography,
    Grid,
    Paper
} from '@material-ui/core'
import {
    Home as HomeIcon,
    Event as EventIcon,
    Menu as MenuIcon,
    TrendingUp as TrendingUpIcon,
    ExitToApp as ExitToAppIcon,
    Settings as SettingsIcon
} from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import logo from '../../HatchfulExport-All/logo_transparent_white.png'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logo: {
    height: '70px'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  tool: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#023047'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    paddingTop: '10px'
  },
  mainAppBar: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
  },
  welcoming: {
      marginTop: '40px'
  }
}))

const Menu = inject('user')(observer((props) => {

  const { window, handleLogout, user } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
        <div className={classes.toolbar} />
        <List>
            <Link to='/home' className={classes.link}>
                <ListItem button key='Home'>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Home'/>
                </ListItem>
            </Link>
            <Link to='/calendar' className={classes.link}>
                <ListItem button key='Calendar'>
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary='Calendar'/>
                </ListItem>
            </Link>
            <Link to='/charts' className={classes.link}>
                <ListItem button key='Analytics'>
                    <ListItemIcon>
                        <TrendingUpIcon />
                    </ListItemIcon>
                    <ListItemText primary='Analytics'/>
                </ListItem>
            </Link>
        </List>
      <Divider />
        <List>
            <ListItem button key={'Settings'}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={'Settings'} />
            </ListItem>
            <ListItem button key={'Log Out'} onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={'Log Out'} />
            </ListItem>
        </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.tool}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.mainAppBar}>
            <img src={logo} className={classes.logo}/>
            <Typography variant="h6" noWrap className={classes.welcoming}>
                {`Welcome, ${user.firstName}`}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}))

Menu.propTypes = {
  window: PropTypes.func,
}

export default Menu