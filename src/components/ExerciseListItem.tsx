import { Dispatch, SetStateAction } from 'react';
import styles from './ExerciseListItem.module.css';

type ListItem = {
    id: number,
    part: string,
    exercises: number,
    timestamp: number
};

type ExerciseListItemProps = {
    exercisesDoneToday: number[],
    setExercisesDoneToday: Dispatch<SetStateAction<number[]>>
} & ListItem;

const ExerciseListItem = ({ id, part, exercises, timestamp, exercisesDoneToday, setExercisesDoneToday }: ExerciseListItemProps) => {

    const incrementExerciseCount = () => {
        // setExerciseDetail(prev => {
        //     const updatedExerciseDetail = prev.map(obj => {
        //         if (obj.id === id) return { ...obj, timestamp: Date.now() };
        //         return obj;
        //     });
        //     return updatedExerciseDetail;
        // });
    }

    const decrementExerciseCount = () => {

    }

    const updateExerciseTimestamp = () => {
        setExercisesDoneToday(prev => {
            return prev.includes(id) ? prev.filter(el => el !== id) : [...prev, id];
        });
    }

    return (
        <div className={styles.card}>

            <div className={styles.wrapper}>
                <div style={{ color: '#FFFFFF' }}>#</div>
                <input type='checkbox' name={part} id={part} onClick={updateExerciseTimestamp} defaultChecked={exercisesDoneToday.includes(id)} />
                <div className={styles.part}>{part[0].toUpperCase() + part.substring(1)}</div>
            </div>

            <div className={styles.wrapper}>
                <button onClick={decrementExerciseCount}>-</button>
                <input type='number' defaultValue={exercises} />
                <button onClick={incrementExerciseCount}>+</button>
            </div>

            <div className={styles.duration}>
                {new Date(timestamp).toString().split(' ')[2]} {new Date(timestamp).toString().split(' ')[1]}, {Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24))} Days
            </div>

        </div>
    );
}

export default ExerciseListItem;
