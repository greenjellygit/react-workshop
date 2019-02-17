import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import styled from "styled-components";
import SpinnerComponent from "../components/spinner.component";
import {clients} from "../config/clients";
import {attachAuthInterceptor} from "../config/interceptors";

export default class AuthConatiner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: null
    };
  }

  componentDidMount() {
    clients.allegroAuth.client.post('/token', null, {
      params: {
        grant_type: 'client_credentials'
      }
    }).then((result) => {
      const accessToken = result.data.access_token;
      localStorage.setItem('accessToken', accessToken);
      this.setState({
        accessToken: accessToken
      });
      attachAuthInterceptor(clients.allegroApi.client, accessToken)
    });
  }

  hasToken = () => {
    return !!this.state.accessToken;
  };

  render() {
    if (this.hasToken()) {
      return <Redirect to='/search'/>
    }

    return (
      <Container>
        <h2>Connecting with Allegro API</h2>
        <SpinnerComponent inProgress={true}/>
      </Container>
    )
  }
}

const Container = styled.div`
  text-align: center;
  margin-top: 100px;
`;