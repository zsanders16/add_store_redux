import axios from 'axios';

export const getApps = (cb) => {
  return (dispatch) => {
    axios.get('/api/apps')
      .then( res => dispatch({ type: 'APPS', apps: res.data }) )
      .then( cb() )
  }
}

export const addApp = (app) => {
  return (dispatch) => {
    axios.post('/api/apps', { app })
      .then( res => dispatch({ type: 'ADD_APP', app: res.data }) )
  }
}

export const updateApp = (app) => {
  return (dispatch) => {
    axios.put(`/api/apps/${app.id}`)
      .then( res => dispatch({ type: 'UPDATE_APP', app: res.data }) )
  }
}

export const deleteApp = (id) => {
  return (dispatch) => {
    axios.delete(`/api/apps/${id}`)
      .then( () => dispatch({ type: 'DELETE_APP', id }) )
  }
}

