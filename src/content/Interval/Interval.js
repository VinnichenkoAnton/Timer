import IntervalItem from './IntervalItem';

import styles from './Interval.module.css';

const Interval = (props) => {
    return (
        <ul className={styles.ulwrapper}> 
            {props.intervalArr.map((interv, index = 1)=> (
                <IntervalItem
                    mlseconds = {interv.mlseconds}
                    seconds = {interv.seconds} 
                    minutes = {interv.minutes} 
                    hours = {interv.hours} 
                    key={interv.id}
                    index={index+1}
                    />
            ))}
        </ul>
    );
};

export default Interval;