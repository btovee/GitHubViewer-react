import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class RepoItems extends Component {

    

  render() {

    let repoItemsTable = null;
    if(this.props.gitHubRepoItems){
        repoItemsTable = (
            <Paper className={this.props.classes.root}>
              <Table className={this.props.classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Repo Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Langauage</TableCell>
                    <TableCell>Last Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.gitHubRepoItems.map(repo => {
                    return (
                      <TableRow key={repo.id}>
                        <TableCell component="th" scope="row" >
                          <NavLink to="/repo-detail/">
                              <Button
                                  color="primary"
                                  className={this.props.classes.button}
                                  onClick={() => this.props.repoSelected(repo.name)}>{repo.name}
                              </Button>
                          </NavLink>
                        </TableCell>
                        <TableCell>{repo.description}</TableCell>
                        <TableCell>{repo.language}</TableCell>
                        <TableCell>
                            <Moment format="DD-MM-YYYY HH:mm">
                                {repo.updated_at}
                            </Moment>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          );
    }


      return (
       <>
        {repoItemsTable}
       </>
      );
  }
}

RepoItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RepoItems);