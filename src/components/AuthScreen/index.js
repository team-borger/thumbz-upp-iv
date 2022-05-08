import React from 'react';
import { View, Text } from 'react-native';
import Login from './Login'

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

  };
  render() {
    return (
      <Login/>
    )
  }
}
