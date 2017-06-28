import React from 'react';
import { connect } from 'react-redux';
import { Divider, Header, Image, Container, Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deleteApp } from '../actions/apps'

const AppView = ({app = {}, dispatch, history }) => (

  <Container>
    <Link to="/apps">View All Apps</Link>
    <Header as="h3" textAlign="center">{app.name}</Header>
    <Image src={app.logo} />
    <Table definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Button basic color='green'>Add To Cart</Button>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Description</Table.Cell>
          <Table.Cell>{app.description}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Author</Table.Cell>
          <Table.Cell>{app.author}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Version</Table.Cell>
          <Table.Cell>{app.version}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Price</Table.Cell>
          <Table.Cell>${app.price}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Category</Table.Cell>
          <Table.Cell>{app.category}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>

    <Button.Group floated='right'>

      <Button as = {Link} to={`/apps/${app.id}/AppForm/`} basic color='blue'>Edit</Button>
      <Button
        onClick={ () => {
          dispatch(deleteApp(app.id));
          history.push('/apps');
        } }
        basic color='red'
      >
        Delete
      </Button>
    </Button.Group>
  </Container>
)

const mapStateToProps = (state, props) => {
  return { app: state.apps.find( a => a.id === parseInt(props.match.params.id )) }
}

export default connect(mapStateToProps)(AppView);
