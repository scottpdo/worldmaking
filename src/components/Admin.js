// @flow

import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

import World from './World';
import Manager from './Manager';

import '../css/Admin.css';

type Props = {
  db: firebase.database,
  manager: Manager
};

type State = {
  world: ?World
};

export default class Admin extends Component<Props, State> {

  colorChange: Function;
  leaveWorld: Function;

  constructor() {

    super();

    this.state = {
      world: null
    };

    this.colorChange = this.colorChange.bind(this);
    this.leaveWorld = this.leaveWorld.bind(this);
  }

  componentDidMount() {
    this.props.manager.on('worldChange', world => {
      this.setState({ world });
    });
  }

  leaveWorld() {
    this.setState({ world: null });
  }

  colorChange(e: Event) {
    const color = parseInt(this.refs.colorpicker.value.slice(1), 16);
    this.props.manager.trigger('colorChange', { color });
  }

  render() {

    const colorpicker = (
      <div>
        <label htmlFor="admin__colorpicker" className="admin__label">Color</label>
        <input 
          className="admin__button admin__button--colorpicker" 
          id="admin__colorpicker"
          type="color" 
          ref="colorpicker" 
          defaultValue="#666666"
          onInput={this.colorChange} />
      </div>
    );

    const exists = this.state.world !== null;

    return (
      <div className="admin">
        <Link to="/" className="admin__button" onClick={this.leaveWorld}>Main</Link>
        {exists ? colorpicker : null}
      </div>
    );
  }
}