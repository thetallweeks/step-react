import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@fortawesome/react-fontawesome';
import './PanelHeader.css';
import get from 'lodash/get';
import map from 'lodash/map';
import router from '../../../../utils/router';
import api from '../../../../utils/api';

function onClickSiblingChapter(chapter, panelIndex, updateStore) {
  const newRef = get(chapter, 'osisKeyId');
  api.get(`/search/masterSearch/reference=${newRef}/NVHUG/?lang=en`)
    .then((data) => {
      updateStore(data);
      router.navigate(data, panelIndex);
    });
}

const PanelHeader = (props) => {
  const {panelIndex, args, previousChapter, nextChapter, updateStore} = props;
  return (
    <div className="PanelHeader">
      <div className="PanelHeader-args">
        {map(args, (arg) => {
          return <span key={arg}>{arg}</span>;
        })}
      </div>
      <div className="PanelHeader-actions">
        <Icon icon="arrow-left" onClick={() => onClickSiblingChapter(previousChapter, panelIndex, updateStore)}/>
        <Icon icon="arrow-right" onClick={() => onClickSiblingChapter(nextChapter, panelIndex, updateStore)}/>
        <Icon icon="times-circle"/>
      </div>
    </div>
  )
};

PanelHeader.propTypes = {
  panelIndex: PropTypes.number,
  args: PropTypes.array,
  nextChapter: PropTypes.shape({
    osisKeyId: PropTypes.string
  }),
  previousChapter: PropTypes.shape({
    osisKeyId: PropTypes.string
  }),
  updateStore: PropTypes.func.isRequired
};

export default PanelHeader;
