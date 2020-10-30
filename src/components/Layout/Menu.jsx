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
    Paper,
    Avatar
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

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logo: {
    height: '45px',
    [theme.breakpoints.up('sm')]: {
      height: '60px',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  tool: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#023047'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  appBarContainer: {
    marginBottom: '60px'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  mainAppBar: {
      display: 'grid',
      gridTemplateColumns: '1fr 4fr',
      alignItems: 'center',
      width: '100%'
  },
  welcoming: {
      fontFamily: "'Montserrat', sans-serif",
      justifySelf: 'end',
      alignSelf: 'end'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
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
            <ListItem button key='img'>
              <ListItemIcon>
                <Avatar 
                  alt="user-avatar" 
                  src='https://storage.jewheart.com/content/users/avatars/2928/avatar_2928_500.jpg?1480517568' 
                  className={classes.small}
                /> 
              </ListItemIcon>
              <ListItemText primary='Profile'/>
            </ListItem>
            <Link to='/home' className={classes.link}>
                <ListItem button key='Home'>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Home'/>
                </ListItem>
            </Link>
            <Link to='/home/calendar' className={classes.link}>
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
      <Grid className={classes.appBarContainer} container>
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
      </Grid>
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