import React from 'react';
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

export default LineProgress;
