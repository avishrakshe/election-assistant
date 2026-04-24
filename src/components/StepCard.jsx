import React from 'react';
import PropTypes from 'prop-types';
import './StepCard.css';

const StepCard = ({ step }) => {
  return (
    <div className="step-card">
      <div className="step-card-header">
        <h3 className="step-title">{step.title}</h3>
        <span className="step-timeline-badge">{step.timeline}</span>
      </div>
      <p className="step-description">{step.description}</p>
    </div>
  );
};

StepCard.propTypes = {
  step: PropTypes.shape({
    title: PropTypes.string.isRequired,
    timeline: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default StepCard;
