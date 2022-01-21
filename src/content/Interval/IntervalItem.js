import styles from './IntervalItem.module.css';

const IntervalItem = (props) => {
    return (
        <li className={styles['interval__wrapper']}>
            <div className={styles['interval__numeration']}>{`${props.index}.`}</div>

            <div className={styles.interval}>{props.hours}</div>
            <div className={styles['interval__colon']}>:</div>
            <div className={styles.interval}>{props.minutes}</div>
            <div className={styles['interval__colon']}>:</div>
            <div className={styles.interval}>{props.seconds}</div>
            <div className={styles['interval__colon']}>:</div>
            <div className={styles.interval}>{props.mlseconds}</div>
        </li>
    );
};

export default IntervalItem;