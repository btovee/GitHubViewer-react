import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Route, NavLink, Switch } from 'react-router-dom';

import Profile from './Profile/Profile';
import RepoDetail from './RepoDetail/RepoDetail';
import GithubApi from '../../classes/github-api/github-api';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
});

class GithubViewer extends Component {

  state = { 
    sideDrawOpen: false,
    gitHubUserName: null,
    gitHubUserProfile: null,
    gitHubRepoItems: null,
    gitHubRepoDetails: null
  }

  constructor(props) {
    super(props);
    this.githubApi = new GithubApi();
  }

  sideDrawToggleHandler = () => {
    this.setState({sideDrawOpen: !this.state.sideDrawOpen});
  }

  enterKeyPressHandler = (event) => {
    if(event.key === 'Enter'){
      //clear previous data
      this.setState({
        gitHubUserName: null,
        gitHubUserProfile: null,
        gitHubRepoItems: null,
        gitHubRepoDetails: null
      });

      const userName = event.target.value;
      this.setState({gitHubUserName: userName});
      this.githubApi.getUser(userName).then(response => {
        this.setState({gitHubUserProfile: response})
      });
      this.githubApi.getReposForUser(userName).then(response => {
        this.setState({gitHubRepoItems: response})
      });
      
    }
  }

  repoSelectedHandler = (repoName) => {
      if(this.state.gitHubUserName){
        this.githubApi.getRepoDetails(this.state.gitHubUserName, repoName).then(response => {
          this.setState({gitHubRepoDetails: response});
      });
    }
  }

  render() {
    return (
      <>
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={this.props.classes.menuButton} onClick={this.sideDrawToggleHandler} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={this.props.classes.title} variant="h6" color="inherit" noWrap>
              Github Viewer
            </Typography>
            <div className={this.props.classes.grow} />
            <div className={this.props.classes.search}>
              <div className={this.props.classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Enter Username"
                classes={{
                  root: this.props.classes.inputRoot,
                  input: this.props.classes.inputInput,
                }}
                onKeyPress={this.enterKeyPressHandler}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.sideDrawOpen} onClick={this.sideDrawToggleHandler} >
        <List>
        <NavLink to="/">
            <ListItem button >
              <ListItemIcon> <HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
        </NavLink>
        </List>
          </Drawer>
      </div>
      <div style={styles.grow}>
        <Grid container spacing={24}>
                <Switch>
                    <Route path="/" exact render={() => <Profile
                                                    gitHubUserProfile={this.state.gitHubUserProfile}
                                                    gitHubRepoItems={this.state.gitHubRepoItems} 
                                                    repoSelected={this.repoSelectedHandler} />}   />
                    <Route path="/repo-detail/" exact render={() => <RepoDetail 
                                                               gitHubRepoDetails={this.state.gitHubRepoDetails} /> }  />
                </Switch>
        </Grid>
      </div>
      </>
    );
  }
}

GithubViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GithubViewer);
