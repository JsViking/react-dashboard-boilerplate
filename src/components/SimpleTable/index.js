import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Preloader from 'components/Preloader';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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

const Programs = ({ list, header, rowClick = () => undefined }) => {
  const classes = useStyles();

  if (!header) return null;
  return (
    <>
      {list ? (
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {header.map(({ title, align = 'center' }) => (
                  <TableCell key={title} align={align}>
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow
                  className={classes.tableRow}
                  key={row.name}
                  onClick={() => rowClick(row.slug)}
                >
                  {header.map(({ value, align = 'center' }) => (
                    <TableCell align={align} key={value}>
                      {typeof row[value] === 'boolean' ? (
                        row[value] ? (
                          <CheckCircleOutlineIcon color="primary" />
                        ) : (
                          <HighlightOffIcon color="error" />
                        )
                      ) : (
                        row[value]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default Programs;
