import Button from '../UI/Button';

import styles from './ButtonWrapper.module.css';

const ButtonWrapper = (props) => {
    return (
        <section className={styles.btns}>
            <Button styles={styles.btn} buttonClickHandler={props.timerStopHandler} title="Clear" />
            <Button styles={styles.startbtn} buttonClickHandler={props.timerStartHandler} title={props.timerNotStarted}/>
            <Button styles={styles.btn} buttonClickHandler={props.intervalStarted} title="Interval" />
        </section>
    );
};

export default ButtonWrapper;