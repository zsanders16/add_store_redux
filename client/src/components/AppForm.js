import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Checkbox, Form, TextArea, Dropdown } from 'semantic-ui-react'
import { updateApp, addApp } from '../actions/apps';

class AppForm extends React.Component {
  defaultValues = { name: '', description: '', category: '', price: '', version: '', author: '', logo: '', featured: false }

  state = { ...this.defaultValues }

  categoryOptions = () => {
    let { categories } = this.props;
    return categories.map( (c,i) => { return { key: i, text: c, value: c }})
  }

  onChange = (e) => {
    let { id, value } = e.target;
    this.setState({ [id]: value })
  }

  checked = (e, data) => {
    this.setState({ featured: data.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let { dispatch, history, selectedApp } = this.props
    let state = this.state;
    if (selectedApp){
      dispatch(updateApp({...state, id: parseInt(selectedApp.id)}))
    }else {
      let { dispatch, history, selectedApp } = this.props
      let state = this.state;
      debugger;
      dispatch(addApp({...state}));
      history.push('/apps');
    }
  }

  componentDidMount(){
    let { selectedApp } = this.props
    if (selectedApp){
      this.setState({...selectedApp})
    }
  }

  render(){
    let { name, description, category, price, version, author, logo, featured } = this.state
    return(
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>App Name</label>
            <input placeholder='First Name' id='name' value={name} onChange={this.onChange}/>
          </Form.Field>

          <Form.Field id='description' control={TextArea} label='Description' placeholder='Description' value={description} onChange={this.onChange} />

          <Form.Field>
            <label>Category</label>
            <Dropdown
              placeholder="Select Category"
              fluid
              selection
              options={this.categoryOptions()}
              onChange={ (e, data) => this.setState({ category: data.value }) }
              value={category}
            />
          </Form.Field>


          <Form.Field>
            <label>Price</label>
            <input placeholder='Price' id='price' value={price} onChange={this.onChange}/>
          </Form.Field>

          <Form.Field>
            <label>Version</label>
            <input placeholder='Version' id='version' value={version} onChange={this.onChange}/>
          </Form.Field>

          <Form.Field>
            <label>Author</label>
            <input placeholder='Author' id='author' value={author} onChange={this.onChange} />
          </Form.Field>

          <Form.Field>
            <label>Logo</label>
            <input placeholder='Logo URL' id='logo' value={logo} onChange={this.onChange} />
          </Form.Field>

          <Form.Field>
            <Checkbox label='Is Featured' id='featured' checked={featured} onClick={this.checked}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>

    )
  }
}

const mapStateToProps = (state, props, dispatch, history) => {
  const apps = state.apps;
  const categories = [...new Set(apps.map( a => a.category ))]
  if (props.match.params){
    const selectedApp = state.apps.find( a => a.id === parseInt(props.match.params.id ))
    return { categories, selectedApp, dispatch, history }
  }else
    return { categories, dispatch, history }
}

export default connect(mapStateToProps)(AppForm);
