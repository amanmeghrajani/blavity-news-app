import React, { Component } from 'react';
import { Segment, Container, Grid, Icon, Header } from 'semantic-ui-react';

class Footer extends Component {
	render () {
		return (
			<Segment inverted vertical style={{ padding: '5em 0em'  }}>
          <Container>
            <Grid divided inverted stackable centered>
              <Grid.Row textAlign="center">
              	<Grid.Column as="a" href="https://newsapi.org/" textAlign="center">
	              	<Header as="h1" color="blue">Powered By NewsAPI</Header>
	              </Grid.Column>
              </Grid.Row>
              	<Header as="h1" color="grey">Developed For&nbsp; &hearts; Blavity &hearts; by Aman</Header>
              <Grid.Row textAlign="center">
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
			)
	}
}


export default Footer;
