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
import Grid from '@material-ui/core/Grid';

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


class RepoDetail extends Component {

    

  render() {

    let repoDetailsTable = null;
    if(this.props.gitHubRepoDetails){
        repoDetailsTable = (
        <Grid item xs={12}>
            <Paper className={this.props.classes.root}>
              <Table className={this.props.classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Info</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                        <TableCell component="th" scope="row">
                          Private
                        </TableCell>
                        <TableCell>
                            {this.props.gitHubRepoDetails.private}
                        </TableCell>
                    </TableRow>
                        <TableCell component="th" scope="row">
                          Html URL
                        </TableCell>
                        <TableCell>
                            {this.props.gitHubRepoDetails.html_url}
                        </TableCell>
                    <TableRow>
                    </TableRow>
                        <TableCell component="th" scope="row">
                          Description
                        </TableCell>
                        <TableCell>
                            {this.props.gitHubRepoDetails.description}
                        </TableCell>
                    <TableRow>
                    </TableRow>
                        <TableCell component="th" scope="row">
                          Created at
                        </TableCell>
                        <TableCell>
                            <Moment>{this.props.gitHubRepoDetails.created_at}</Moment>
                        </TableCell>
                    <TableRow>
                    </TableRow>
                        <TableCell component="th" scope="row">
                          Updated at
                        </TableCell>
                        <TableCell>
                            <Moment>{this.props.gitHubRepoDetails.updated_at}</Moment>
                        </TableCell>
                    <TableRow>
                    </TableRow>
                        <TableCell component="th" scope="row">
                          Clone URL
                        </TableCell>
                        <TableCell>
                            {this.props.gitHubRepoDetails.clone_url}
                        </TableCell>
                    <TableRow>
                    </TableRow>
                        <TableCell component="th" scope="row">
                          Stargazers Count
                        </TableCell>
                        <TableCell>
                            {this.props.gitHubRepoDetails.stargazers_count}
                        </TableCell>
                    <TableRow>
                    </TableRow>
                        <TableCell component="th" scope="row">
                          Watchers Count
                        </TableCell>
                        <TableCell>
                            {this.props.gitHubRepoDetails.watchers_count}
                        </TableCell>
                    <TableRow>
                    </TableRow>
                        <TableCell component="th" scope="row">
                          Language
                        </TableCell>
                        <TableCell>
                            {this.props.gitHubRepoDetails.language}
                        </TableCell>
                    <TableRow>
                    </TableRow>
                </TableBody>
              </Table>
            </Paper>
            </Grid>
          );
    }
      return (
       <>
        {repoDetailsTable}
       </>
      );
  }
}

RepoDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RepoDetail);