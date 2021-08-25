import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import { Checkboxes } from 'mui-rff';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import routes from '../../../routes';
import { savePermissions, getPermissions } from '../../../request';

const useStyles = makeStyles({
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
  checkBoxesWrapper: {
    margin: '15px 0',
    '& label': {
      minWidth: 320,
    },
  },
});

const Permissions = () => {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const [list, setList] = useState({});

  useEffect(() => {
    async function fetchData() {
      const permissions = await getPermissions();
      const value = {
        user_permissions: permissions
          .filter((el) => el.is_active)
          .map((el) => el.slug),
      };
      setValues(value);

      // Доступы по роутингу
      const data = routes
        .filter((el) => el.path && el.path !== '/')
        .map((elem) => ({
          label: elem.name,
          value: elem.path,
        }));

      // Кастомный доступы
      const customPermissions = [
        // {
        //   label: 'Кастомный доступ',
        //   value: 'deleteArticlesAllowed',
        // },
      ];
      setList([...data, ...customPermissions]);
    }
    fetchData();
  }, []);

  const onSubmit = async ({ user_permissions = [] }) => {
    try {
      const prepareValue = list.map((el) => ({
        name: el.label,
        slug: el.value,
        is_active: user_permissions.includes(el.value),
      }));
      await savePermissions(prepareValue);
    } catch (error) {
      console.error('ошибка при сохранении статьи', error);
    }
  };

  const checkAllHandler = () => {
    const value = {
      user_permissions: list.map((el) => el.value),
    };
    setValues(value);
  };

  return (
    <Form
      initialValues={values}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <Paper style={{ padding: 15, marginBottom: 15 }} elevation={0}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={checkAllHandler}
                variant="outlined"
                size="small"
                color="primary"
              >
                Выбрать все
              </Button>
              <Button
                onClick={() => setValues({})}
                variant="outlined"
                size="small"
              >
                Снять все
              </Button>
            </ButtonGroup>
            <div className={classes.checkBoxesWrapper}>
              <Checkboxes
                label="Права доступа"
                name="user_permissions"
                data={list}
              />
            </div>
            <Button
              type="submit"
              className={classes.marginTop}
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

export default Permissions;
