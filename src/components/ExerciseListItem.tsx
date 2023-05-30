import { Dispatch, SetStateAction, useState } from 'react';
import styles from './ExerciseListItem.module.css';

type ListItem = {
    id: number,
    part: string,
    exercises: number,
    timestamp: number
};

type ExerciseListItemProps = {
    exercisesDoneToday: Array<{ id: number, exercises: number }>,
    setExercisesDoneToday: Dispatch<SetStateAction<Array<{ id: number, exercises: number }>>>
} & ListItem;

const ExerciseListItem = ({ id, part, exercises, timestamp, exercisesDoneToday, setExercisesDoneToday }: ExerciseListItemProps) => {

    const [exerciseCount, setExerciseCount] = useState<number>(exercises);

    const incrementExerciseCount = () => {
        setExerciseCount(prev => prev + 1);
    }

    const decrementExerciseCount = () => {
        setExerciseCount(prev => prev - 1);
    }

    const updateExerciseTimestamp = () => {
        setExercisesDoneToday(prev => {
            return prev.find(obj => obj.id === id) ? prev.filter(el => el.id !== id) : [...prev, { id, exercises: exerciseCount }];
        });
    }

    return (
        <div className={styles.card}>

            <div className={styles.wrapper}>
                <div><span className='material-symbols-outlined'>drag_indicator</span></div>
                <input
                    type='checkbox'
                    id={part}
                    name={part}
                    onClick={updateExerciseTimestamp}
                    defaultChecked={exercisesDoneToday.find(obj => obj.id === id) ? true : false}
                />
                <div className={styles.part}>{part[0].toUpperCase() + part.substring(1)}</div>
            </div>

            <div className={styles.wrapper}>
                <button onClick={decrementExerciseCount}>-</button>
                <input type='number' value={exerciseCount} onChange={e => setExerciseCount(+e.target.value)} />
                <button onClick={incrementExerciseCount}>+</button>
            </div>

            <div className={styles.duration}>
                {new Date(timestamp).toString().split(' ')[2]} {new Date(timestamp).toString().split(' ')[1]}, {Math.round((Date.now() - timestamp) / (1000 * 60 * 60 * 24))} Days
            </div>

        </div>
    );
}

export default ExerciseListItem;
