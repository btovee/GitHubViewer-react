import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'react-moment'

const styles = theme => ({
    card: {
        maxWidth: "90%",
      },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: "auto"
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class UserProfile extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    let userProfile = null;

    if(this.props.gitHubUserProfile){
        userProfile = (
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="User" className={classes.avatar}>
                      U
                  </Avatar>
                }
                title={this.props.gitHubUserProfile.login}
                subheader={this.props.gitHubUserProfile.name}
              />
              <CardMedia
                className={classes.media}
                image={this.props.gitHubUserProfile.avatar_url}
                title={this.props.gitHubUserProfile.login}
              />
              <CardContent>
                <Typography component="p">
                  {this.props.gitHubUserProfile.bio}
                </Typography>
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <List>
                    <ListItem>
                        <ListItemText primary="Company" secondary={ this.props.gitHubUserProfile.company } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Blog" secondary={ <a href={this.props.gitHubUserProfile.blog} target="_blank" >{this.props.gitHubUserProfile.blog}</a> } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Location" secondary={ this.props.gitHubUserProfile.location } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Email" secondary={ this.props.gitHubUserProfile.email } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Hireable" secondary={ this.props.gitHubUserProfile.hireable } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Public Repos" secondary={ this.props.gitHubUserProfile.public_repos } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Public Gists" secondary={ this.props.gitHubUserProfile.public_gists } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Followers" secondary={ this.props.gitHubUserProfile.followers } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Following" secondary={ this.props.gitHubUserProfile.following } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Created At" secondary={ <Moment format="DD-MM-YYYY HH:mm">{this.props.gitHubUserProfile.created_at}</Moment>  } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Updated At" secondary={<Moment format="DD-MM-YYYY HH:mm">{this.props.gitHubUserProfile.created_at}</Moment>  } />
                    </ListItem>
                </List>
                </CardContent>
              </Collapse>
            </Card>
          );
    }


    return (
        <>
            {userProfile}
        </>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);