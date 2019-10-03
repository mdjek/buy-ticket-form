import React from 'react';
import PropTypes from 'prop-types';
import styles from './LineProgress.module.scss';

const LineProgress = ({ stepData }) => {
  const { step, stepsCount } = stepData;

  return (
    <div className={styles.line}>
      <div
        style={{ width: `${(step / stepsCount) * 100}%` }}
        className={styles.progress}
      />
    </div>
  );
};

LineProgress.propTypes = {
  stepData: PropTypes.shape({
    step: PropTypes.number,
    stepsCount: PropTypes.number,
  }),
};

export default LineProgress;
