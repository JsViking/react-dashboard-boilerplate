import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import UsersList from 'feature/UsersList';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'hook/useQuery';
import { getUsersList } from '../../../request';

const Users = () => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const [users, setUsers] = useState();
  const initPage =
    query.get('page') && typeof Number(query.get('page')) === 'number'
      ? Number(query.get('page'))
      : 1;
  const initPerPage =
    query.get('per_page') && typeof Number(query.get('per_page')) === 'number'
      ? Number(query.get('per_page'))
      : 10;
  const [page, setPage] = React.useState(initPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(initPerPage);

  useEffect(() => {
    if (!location.search) {
      history.push(
        `/admin/administration/users?page=${page}&per_page=${rowsPerPage}`
      );
      return;
    }
    async function fetchData() {
      const res = await getUsersList(location.search);
      setUsers(res);
    }
    fetchData();
  }, [location.search]);

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    history.push(`/admin/administration/users?page=1&per_page=${value}`);
    setRowsPerPage(value);
  };

  const handleChangePage = (event, page) => {
    history.push(
      `/admin/administration/users?page=${page + 1}&per_page=${rowsPerPage}`
    );
    setPage(page + 1);
  };

  return (
    <>
      <Paper style={{ padding: 15, marginBottom: 15 }} elevation={0}>
        <Button
          onClick={() => history.push('/admin/administration/users/new')}
          variant="contained"
          color="primary"
        >
          Добавить пользователя
        </Button>
        {users && (
          <UsersList
            {...users}
            onClick={(id) =>
              history.push(`/admin/administration/users/edit/${id}`)
            }
            page={page - 1}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangePage={handleChangePage}
          />
        )}
      </Paper>
    </>
  );
};

export default Users;
