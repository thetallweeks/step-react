import React from 'react';
import PropTypes from 'prop-types';
import Panel from './Panel';
import router from '../../utils/router';
import get from 'lodash/get';
import map from 'lodash/map';
import size from 'lodash/size';
import './Panels.css';
import {indexFromKey} from '../../utils/panels';

const Panels = (props) => {
  const {data, updateStore} = props;

  let panelsFromUrl = router.parseSearch(window.location.search);

  if (size(panelsFromUrl) === 0) {
    panelsFromUrl = {
      p0: {
        ref: 'Matt.1'
      }
    }
  }

  return (
    <div className="Panels">
      {map(panelsFromUrl, (panel, key) => {
        return (
          <Panel
            key={key}
            index={indexFromKey(key)}
            panel={panel}
            reference={get(data, panel.ref)}
            updateStore={updateStore}
          />
        )
      })}
    </div>
  );
};

Panels.propTypes = {
  data: PropTypes.object,
  updateStore: PropTypes.func
};

export default Panels;
