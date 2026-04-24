import React from 'react';
import './Timeline.css';
import StepCard from './StepCard';
import { electionProcessSteps } from '../utils/mockData';

const Timeline = () => {
  return (
    <div className="timeline-container animate-fade-in">
      {electionProcessSteps.map((step) => (
        <div key={step.id} className="timeline-item">
          <div className="timeline-marker">
            <span className="marker-icon">{step.icon}</span>
          </div>
          <div className="timeline-content">
            <StepCard step={step} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
