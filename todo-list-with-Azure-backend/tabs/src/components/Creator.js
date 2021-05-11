// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import './Creator.css';
import { createMicrosoftGraphClient } from "teamsdev-client";
import defaultPhoto from '../images/default-photo.png'

class Creator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      photoObjectURL: "",
    }
  }

  async componentDidMount() {
    try {
      const graphClient = await createMicrosoftGraphClient(this.props.credential, this.props.scope);
      const displayName = (await graphClient.api(`/users/${this.props.objectId}`).get()).displayName;
      let photoObjectURL;
      try {
        const photoBlob = await graphClient.api(`/users/${this.props.objectId}/photo/$value`).get()
        photoObjectURL = URL.createObjectURL(photoBlob);
      } catch (error) {
      }
      this.setState({
        displayName,
        photoObjectURL,
      });
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="creator">
        <div>
          <img src={this.state.photoObjectURL ? this.state.photoObjectURL : defaultPhoto} alt="avatar" />
        </div>
        <div className="name">{this.state.displayName}</div>
      </div>
    );
  }
}

export default Creator;