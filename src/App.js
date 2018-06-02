import React, {Component} from 'react';
import PropTypes from 'prop-types';
import router from './utils/router';
import Header from './components/Header';
import Panels from './components/Panels';
import './App.css';

// TODO: For performance only add icons that are used
// https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently
import '@fortawesome/fontawesome-free-solid';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathname: props.pathname,
      search: props.search,
      data: {}
    };
  }

  componentDidMount() {
    router.listen(this.handleNav);
  }

  handleNav = ({pathname, search}) => {
    this.setState({pathname, search});
  }

  updateStore = (data) => {
    this.setState({data: { ...this.state.data, [data.osisId]: data}});
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Panels data={this.state.data} updateStore={this.updateStore}/>
      </div>
    );
  }
}

App.propTypes = {
  pathname: PropTypes.string
};

export default App;
