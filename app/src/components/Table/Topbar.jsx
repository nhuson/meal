import React from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import IconCreate from '@material-ui/icons/Add';
import IconRefresh from '@material-ui/icons/Refresh';
import {grey } from '@material-ui/core/colors'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: grey[700]
  },
  appbar:{
    borderTop: `1px solid ${theme.palette.grey['200']}`,
    backgroundColor: grey[200]
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.08),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  action: {
      marginLeft: 20
  }
});


class Topbar extends React.Component {
  render() {
    const { classes, title } =  this.props
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.appbar} >
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    {title}
                </Typography>
                <div className={classes.grow} />
                <div className={classes.search}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                />
            </div>
                <div className={classes.action}>
                    {this.props.handleCreate ? (<IconButton 
                        color={grey[400]}
                        onClick={this.props.handleCreate}
                    >
                        <IconCreate />
                    </IconButton>) : ""}
                    {this.props.handleRefresh ? (<IconButton 
                    	color={grey[400]}
						          onClick={this.props.handleRefresh}
					          >
                        <IconRefresh />
                    </IconButton>) : ""}
                    
                </div>
            </Toolbar>
        </AppBar>
        </div>
    )
  }
}

Topbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Topbar);