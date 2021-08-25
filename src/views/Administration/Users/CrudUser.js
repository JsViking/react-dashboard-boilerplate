/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import { TextField, Switches, Checkboxes } from 'mui-rff';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useParams, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { emailValidation, getBase64Image } from 'assets/js/helper';
import {
  createUser,
  saveUser,
  getUser,
  getPermissions,
  getRoles,
} from '../../../request';
import { FormControl, InputLabel, Select } from '@material-ui/core';

const SelectRole = ({ handleChange, state, roles = [] }) => {
  return (
    <FormControl
      variant="outlined"
      style={{
        marginBottom: '10px',
      }}
    >
      <InputLabel htmlFor="outlined-age-native-simple">Роль</InputLabel>
      <Select
        native
        value={state}
        onChange={handleChange}
        label="Роль"
        inputProps={{
          name: 'Роль',
        }}
      >
        <option aria-label="None" value="" />
        {roles.map(({ name, id, slug }) => (
          <option key={id} value={slug}>
            {name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: '8px 0',
      width: '100%',
    },
    '& .MuiFormGroup-root': {
      flexDirection: 'row',
      justifyContent: 'stretch',
    },
  },
  submitBtn: {
    marginRight: 5,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  checkBoxesWrapper: {
    margin: '15px 0',
    '& label': {
      minWidth: 300,
    },
  },
  dropZoneContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '19px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    margin: '8px 0',
  },
  avatar: {
    margin: '8px 100px',
    cursor: 'pointer',
  },
}));

const validate = (values, isEdit) => {
  const { email, last_name, first_name, password } = values;
  const errors = {};
  if (!email) {
    errors.email = 'Обязательно для заполнения';
  }
  if (!last_name) {
    errors.last_name = 'Обязательно для заполнения';
  }
  if (!first_name) {
    errors.first_name = 'Обязательно для заполнения';
  }
  if (!emailValidation(email)) {
    errors.email = 'Не правильный формат почты';
  }
  if (!isEdit && !password) {
    errors.password = 'Обязательно для заполнения';
  }
  return errors;
};

const CrudUser = () => {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const [initValues, setValues] = useState({
    email: '',
    last_name: '',
    first_name: '',
    user_permissions: [],
    description: '',
    avatar: '',
    role: {},
  });
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [listPermissions, setListPermissions] = useState([]);
  const [avatar, setAvatar] = useState();

  const setUserData = (res) => {
    const prepareUsers = { ...res };
    prepareUsers.user_permissions = res.user_permissions.map(
      (permission) => permission.slug
    );
    setValues(prepareUsers);
    setRole(res?.role?.slug || '');
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getUser(id);
      if (res.id) {
        setUserData(res);
      } else history.push(`/admin/administration/users`);
    }

    async function fetchPermissionsData() {
      const results = await getPermissions();
      const preparePermission = results.map((permission) => ({
        label: permission.name,
        value: permission.slug,
      }));
      // setOriginPermissions(results);
      setListPermissions(preparePermission);
    }

    async function featchRoles() {
      const response = await getRoles();
      setRoles(response);
    }

    fetchPermissionsData();
    featchRoles();
    if (id) fetchData();
  }, []);

  // const checkAllHandler = (rest) => {
  //   setValues({
  //     ...rest.values,
  //     user_permissions: listPermissions.map((el) => el.value),
  //   });
  // };

  const onSubmit = async (values) => {
    const prepareValues = { ...values, role };
    // prepareValues.user_permissions_slugs = prepareValues.user_permissions;
    if (avatar) prepareValues.avatar = avatar;
    else delete prepareValues.avatar;
    delete prepareValues.user_permissions;

    try {
      if (id) {
        const res = await saveUser(id, prepareValues);
        if (res.id) setUserData(res);
      } else {
        await createUser(prepareValues);
        history.push(`/admin/administration/users`);
      }
    } catch (error) {
      console.error('ошибка при сохранении статьи', error);
    }
  };

  const handleOnLoad = async (file) => {
    const baseFile = await getBase64Image(file[0]);
    setAvatar(baseFile);
  };

  return (
    <Form
      initialValues={initValues}
      onSubmit={onSubmit}
      validate={(values) => validate(values, id)}
      render={({ handleSubmit, valid, ...rest }) => (
        <form
          onSubmit={handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <Paper style={{ padding: 15, marginBottom: 15 }} elevation={0}>
            <Switches
              label="Пользователь включен"
              name="is_active"
              data={{ label: null }}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Почта"
                  variant="outlined"
                  name="email"
                  margin="none"
                  size="small"
                />
                <TextField
                  required={!id}
                  label="Пароль"
                  variant="outlined"
                  name="password"
                  margin="none"
                  size="small"
                />
                <TextField
                  multiline
                  rows={4}
                  label="Описание"
                  variant="outlined"
                  name="description"
                  margin="none"
                  size="small"
                />
                <SelectRole
                  roles={roles}
                  state={role}
                  handleChange={(e) => {
                    setRole(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Имя"
                  variant="outlined"
                  name="first_name"
                  margin="none"
                  size="small"
                />
                <TextField
                  required
                  label="Фамилия"
                  variant="outlined"
                  name="last_name"
                  margin="none"
                  size="small"
                />
                <Dropzone
                  accept=".img,.jpg,.jpeg,.png,.gif"
                  onDrop={handleOnLoad}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className={classes.dropZoneContainer}>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {avatar || rest.values.avatar ? (
                          <Avatar
                            src={avatar || rest.values.avatar}
                            className={classes.avatar}
                          />
                        ) : (
                          <p>Перенесите или выберите аватар</p>
                        )}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Grid>
            </Grid>
            {/* <ButtonGroup
              className={classes.groupButtonWrapper}
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => checkAllHandler(rest)}
                variant="outlined"
                size="small"
                color="primary"
              >
                Выбрать все
              </Button>
              <Button
                onClick={() =>
                  setValues({ ...rest.values, user_permissions: [] })
                }
                variant="outlined"
                size="small"
              >
                Снять все
              </Button>
            </ButtonGroup> */}
            <div className={classes.checkBoxesWrapper}>
              <Checkboxes
                disabled
                label="Права доступа"
                name="user_permissions"
                data={listPermissions}
              />
            </div>
            <Button
              disabled={!valid}
              type="submit"
              className={classes.submitBtn}
              variant="contained"
              color="primary"
            >
              Сохранить
            </Button>
          </Paper>
        </form>
      )}
    />
  );
};

export default CrudUser;
