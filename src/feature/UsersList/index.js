import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginTop: 30,
  },
  tableRow: {
    cursor: 'pointer',
  },
});

const UsersList = ({
  results = [],
  rowsPerPage = 25,
  onChangeRowsPerPage,
  onChangePage,
  onClick,
  page = 0,
  ...props
}) => {
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    // console.log(newPage)
    onChangePage(event, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    onChangeRowsPerPage(value);
  };

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell align="center">Фамилия</TableCell>
            <TableCell align="center">Почта</TableCell>
            <TableCell align="center">Активен</TableCell>
            <TableCell align="center">Тип учетной записи</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row) => {
            return (
              <TableRow
                className={classes.tableRow}
                key={row.id}
                onClick={() => onClick(row.id)}
              >
                <TableCell component="th" scope="row">
                  {row.first_name}
                </TableCell>
                <TableCell align="center">{row.last_name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  {row.is_active ? (
                    <PlayCircleOutlineIcon color="primary" />
                  ) : (
                    <PauseCircleOutlineIcon color="error" />
                  )}
                </TableCell>
                <TableCell align="center">{row.role.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10]}
              labelRowsPerPage="Статьи"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} из ${count !== -1 ? count : to}`
              }
              count={props.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
