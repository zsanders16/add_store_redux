import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Apps from './Apps';
import AppView from './AppView';
import AppForm from './AppForm';
import { getApps } from '../actions/apps';
import { Loader, Segment, Dimmer } from 'semantic-ui-react';

class FetchApps extends React.Component {
  state = { loaded: false }

  componentDidMount() {
    this.props.dispatch(getApps(this.setLoaded))
  }

  setLoaded = () => {
    this.setState({ loaded: true });
  }

  render() {
    let { loaded } = this.state;
    if (loaded) {
      return (
        <Switch>
          <Route exact path="/apps" component={Apps} />
          <Route exact path="/apps/:id/AppForm/" component={AppForm} />
          <Route exact path="/apps/AppForm/" component={AppForm} />
          <Route exact path="/apps/:id" component={AppView} />
        </Switch>
      )
    } else {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      )
    }
  }
}

export default connect()(FetchApps);
