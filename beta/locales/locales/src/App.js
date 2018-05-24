import React from 'react';
import { Admin, Resource, List, Datagrid, TextField} from 'react-admin';
import jsonServerProvider from './jsonDataProvider';
import {UserList} from './user'


const dataProvider = jsonServerProvider('http://localhost:8080/api/v1');

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="User" list={UserList} />
    </Admin>
);

export default App;