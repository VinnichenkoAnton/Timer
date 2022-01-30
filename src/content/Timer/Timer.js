import styles from './Timer.module.css';

const Timer = props => {
    const stylesCheck = props.isToggled ? `${styles['timer__dots']} ${styles['timer__dots_animated']}` : styles['timer__dots'];

    const timeSlicer = (timeframe)=> {
        return ('0' + (timeframe) % 100).slice(-2);
    };
    
    return (
        <section className={styles.timer}>
            <div className={styles['timer__block']}>{timeSlicer(props.currentTime.hours)}</div>
            <div  className={stylesCheck} >:</div>
            <div className={styles['timer__block']}>{timeSlicer(props.currentTime.minutes)}</div>
            <div  className={stylesCheck} >:</div>
            <div className={styles['timer__block']}>{timeSlicer(props.currentTime.seconds)}</div>
            <div  className={stylesCheck} >:</div>
            <div className={styles['timer__block']}>{timeSlicer(props.currentTime.mlseconds)}</div>
        </section>
    );
};

export default Timer;