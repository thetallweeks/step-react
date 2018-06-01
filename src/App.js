import React, {Component} from 'react';
import PropTypes from 'prop-types';
import router from './utils/router';
import api from './utils/api';
import Header from './components/Header';
import Panel from './components/Panel';
import './App.css';
import get from 'lodash/get';
import forEach from 'lodash/forEach';

// TODO: For performanc only add icons that are used
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

    const refsFromUrl = router.parseSearch(this.state.search);

    try {
      forEach(refsFromUrl, async (value) => {
        const reference = get(value, 'ref') || 'Gen.1';
        const data = await api.get(`/search/masterSearch/reference=${reference}/VNHUG?lang=en`);
        this.updateStore(data);
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  getOsisId(panelIndex) {
    const refFromUrl = router.parseSearch(this.state.search);
    return get(refFromUrl, [`p${panelIndex}`, 'ref']) || 'Gen.1';
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
        <div className="App-panels">
          <Panel
            index={0}
            reference={get(this.state.data, this.getOsisId(0))}
            updateStore={this.updateStore}
          />
          <Panel
            index={1}
            reference={get(this.state.data, this.getOsisId(1))}
            updateStore={this.updateStore}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  pathname: PropTypes.string
};

export default App;
