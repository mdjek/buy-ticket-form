import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './BuyProgress.module.scss';

const BuyProgress = ({ stepData }) => {
  const { step, stepsCount, finished } = stepData;

  return (
    <Fragment>
      <div className={styles.line}>
        <div
          style={{ width: `${(step / stepsCount) * 100}%` }}
          className={styles.progress}
        />
      </div>
      {!finished && (
        <div className={styles.text}>{`Шаг ${step} из ${stepsCount}`}.</div>
      )}
    </Fragment>
  );
};

BuyProgress.propTypes = {
  stepData: PropTypes.shape({
    finished: PropTypes.bool,
    step: PropTypes.number,
    stepsCount: PropTypes.number,
  }),
};

export default BuyProgress;
