import React from 'react';
import { View, Text } from 'react-native';
import Call from './Call'
import CallScreen from './CallScreen'

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

  };
  render() {
    return (
      <Call/>
    )
  }
}
