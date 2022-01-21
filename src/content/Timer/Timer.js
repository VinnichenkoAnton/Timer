import styles from './Timer.module.css';

const Timer = props => {
    return (
        <section className={styles.timer}>
            <div className={styles['timer__block']}>{('0' + (props.currentTime.hours) % 100).slice(-2)}</div>
            <div  className={props.isToggled === true ? `${styles['timer__dots']} ${styles['timer__dots_animated']}` : styles['timer__dots']} >:</div>
            <div className={styles['timer__block']}>{('0' + (props.currentTime.minutes) % 100).slice(-2)}</div>
            <div  className={props.isToggled === true ? `${styles['timer__dots']} ${styles['timer__dots_animated']}` : styles['timer__dots']} >:</div>
            <div className={styles['timer__block']}>{('0' + (props.currentTime.seconds) % 100).slice(-2)}</div>
            <div  className={props.isToggled === true ? `${styles['timer__dots']} ${styles['timer__dots_animated']}` : styles['timer__dots']} >:</div>
            <div className={styles['timer__block']}>{('0' + (props.currentTime.mlseconds) % 100).slice(-2)}</div>
        </section>
    );
};

export default Timer;