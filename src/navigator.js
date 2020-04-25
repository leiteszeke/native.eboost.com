// Dependencies
import * as React from 'react';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (name, params) =>
  navigationRef.current?.navigate(name, params);

export const setParams = (params) => {
  navigationRef.current?.dispatch(CommonActions.setParams(params));
};
