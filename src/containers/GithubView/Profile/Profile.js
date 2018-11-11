import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UserProfile from './UserProfile/UserProfile';
import RepoItems from './RepoItems/RepoItems';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({});
  
class Profile extends Component {

    render() {
        return (<>
        <Grid item xs={12} sm={6}>
          <UserProfile gitHubUserProfile={this.props.gitHubUserProfile} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={ this.props.classes.paper}>
            <RepoItems gitHubRepoItems={this.props.gitHubRepoItems} repoSelected={this.props.repoSelected} />
          </Paper>
        </Grid>
        </>
        );
    }

}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(Profile);