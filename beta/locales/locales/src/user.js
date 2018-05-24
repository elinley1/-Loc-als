import React from 'react';
import { Admin, Resource, List, Datagrid, TextField} from 'react-admin';
export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="local.username" />
            <TextField source="email" />
        </Datagrid>
    </List>
);