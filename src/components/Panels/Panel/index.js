import React from 'react';
import PropTypes from 'prop-types';
import './Panel.css';
import PanelHeader from './PanelHeader';
import get from 'lodash/get';

// data
import api from '../../../utils/api';
import {lifecycle} from 'recompose';

const Panel = (props) => {
  const {index, reference, updateStore} = props;

  if (!reference) return 'Loading...';

  // TODO: More of the contents should be handled by the clientside code
  return (
    <div>
      <PanelHeader
        panelIndex={index}
        args={[reference.masterVersion, reference.reference]}
        nextChapter={reference.nextChapter}
        previousChapter={reference.previousChapter}
        updateStore={updateStore}
      />
      <div
        className="Panel-content"
        dangerouslySetInnerHTML={{__html: reference.value}}
      />
    </div>
  );
};

Panel.propTypes = {
  index: PropTypes.number,
  panel: PropTypes.shape({
    ref: PropTypes.string
  }),
  reference: PropTypes.object,
  updateStore: PropTypes.func
};

const PanelWithData = lifecycle({
  async componentDidMount() {
    const {props} = this;

    if (!props.reference) {
      try {
        const reference = get(props, ['panel', 'ref']) || 'Matt.1';
        const data = await api.get(`/search/masterSearch/reference=${reference}/VNHUG?lang=en`);
        props.updateStore(data);
      }
      catch (err) {
        console.log(err);
      }
    }

  }
})(Panel);

export default PanelWithData;
