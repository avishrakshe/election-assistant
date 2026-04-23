import React from 'react';
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

export default StepCard;
