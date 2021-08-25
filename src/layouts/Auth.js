import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTextField-root': {
      margin: '8px 0',
      width: '100%',
    },
  },
  submitBtn: {
    width: '100%',
    marginTop: 5,
  },
}));

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Обязательно для заполнения';
  }
  if (!values.password) {
    errors.password = 'Обязательно для заполнения';
  }
  return errors;
};

const Auth = ({ getAuth }) => {
  const classes = useStyles();
  const history = useHistory();
  const onSubmit = async (values) => {
    const success = await getAuth(values);
    if (success) history.push(`/admin/`);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      css={{ width: '100%', height: '100vh' }}
    >
      <Card style={{ padding: 15, minWidth: 300 }}>
        <Form
          initialValues={null}
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, valid }) => (
            <form
              onSubmit={handleSubmit}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required
                  label="Логин"
                  variant="outlined"
                  name="email"
                  margin="none"
                />
              </div>
              <div>
                <TextField
                  required
                  label="Пароль"
                  variant="outlined"
                  name="password"
                  margin="none"
                  type="password"
                />
              </div>
              <Button
                disabled={!valid}
                size="large"
                type="submit"
                className={classes.submitBtn}
                variant="contained"
                color="primary"
              >
                Войти
              </Button>
            </form>
          )}
        />
      </Card>
    </Box>
  );
};

const mapDispatch = (dispatch) => ({
  getAuth: dispatch.auth.getAccessToken,
});

export default connect(null, mapDispatch)(Auth);
