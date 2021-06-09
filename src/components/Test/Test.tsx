import React from 'react';
import styles from './Test.module.scss';

const Test: React.FC = () => (
  <div className={styles.Test} data-testid="Test">
    Test Component
  </div>
);

export default Test;
