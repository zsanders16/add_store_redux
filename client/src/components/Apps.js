import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid, 
  Header,
  Card,
  Image,
  Dropdown, 
  Divider,
  Button,
} from 'semantic-ui-react';

class Apps extends React.Component {
  state = { category: '' }

  apps = () => {
    let { apps } = this.props;
    let { category } = this.state;
    let visible = apps;
    if (category)
      visible = apps.filter( a => a.category === category )
    return visible.map( app => {
      let { id, logo, name, author, category } = app;
      return (
        <Grid.Column key={id} computer={4}>
          <Card>
            <Image src={logo} />
            <Card.Content>
              <Card.Header>
                { name }
              </Card.Header>
              <Card.Meta>
                <span>{author}</span>
              </Card.Meta>
              <Card.Description>
                { category }
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to={`/apps/${id}`}>View App</Link>
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    })
  }

  categoryOptions = () => {
    let { categories } = this.props;
    return categories.map( (c,i) => { return { key: i, text: c, value: c }})
  }

  render() {
    let { category } = this.state;
    return (
      <Container>
        <Header as="h3" textAlign="center">Apps</Header>
        <Dropdown
          placeholder="Filter By Category"
          fluid
          selection
          options={this.categoryOptions()}
          onChange={ (e, data) => this.setState({ category: data.value }) }
          value={category}
        />
        { category &&   
            <Button
              fluid
              basic
              onClick={ () => this.setState({ category: '' }) }
            >
              Clear Filter: {category}
            </Button>
        }
        <Divider />
        <Grid columns={16}>
          <Grid.Row>
            { this.apps() }
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const apps = state.apps;
  const categories = [...new Set(apps.map( a => a.category ))]
  return { apps, categories }
}

export default connect(mapStateToProps)(Apps);





