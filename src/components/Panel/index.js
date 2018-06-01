import React from 'react';
import PropTypes from 'prop-types';
import './Panel.css';
import PanelHeader from './PanelHeader';

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
  reference: PropTypes.object,
  updateStore: PropTypes.func
};

export default Panel;
