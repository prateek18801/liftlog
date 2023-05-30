import { Dispatch, SetStateAction } from 'react';
import styles from './Stats.module.css';

const Stats = ({ setPage }: { setPage: Dispatch<SetStateAction<number>> }) => {
    return (
        <div className={styles.page}>
            Hello World!
        </div>
    );
}

export default Stats;
