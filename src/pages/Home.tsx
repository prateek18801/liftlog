import { useState } from 'react';
import ExerciseListItem from '../components/ExerciseListItem';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from './Home.module.css';

const Home: React.FC = () => {

    const [exerciseSchedule, setExerciseSchedule] = useLocalStorage('SCHEDULE', [
        { part: 'chest', exercises: 4, timestamp: 1682899200000, id: 0 },
        { part: 'biceps', exercises: 4, timestamp: 1682899200000, id: 1 },
        { part: 'forearms', exercises: 4, timestamp: 1682899200000, id: 2 },
        { part: 'triceps', exercises: 4, timestamp: 1682899200000, id: 3 },
        { part: 'shoulders', exercises: 4, timestamp: 1682899200000, id: 4 },
        { part: 'back', exercises: 4, timestamp: 1682899200000, id: 5 },
        { part: 'legs', exercises: 4, timestamp: 1682899200000, id: 6 }
    ]);

    const initialzeExercisesDoneToday: number[] = [];
    exerciseSchedule.forEach(listItem => {
        if (Math.floor((Date.now() - listItem.timestamp) / (1000 * 60 * 60)) < 12) initialzeExercisesDoneToday.push(listItem.id);
    });
    
    const [exercisesDoneToday, setExercisesDoneToday] = useState<number[]>(initialzeExercisesDoneToday);

    const updateTimestamps = () => {
        const updatedExerciseSchdeule = exerciseSchedule.map(listItem => {
            if (exercisesDoneToday.includes(listItem.id)) return { ...listItem, timestamp: Date.now() };
            return listItem;
        });
        setExerciseSchedule(updatedExerciseSchdeule);
    }

    return (
        <div className={styles.page}>

            <div className={styles.schedule}>
                <div>Today's Schedule</div>
                <div className={styles.dflex}>
                    <div>{exerciseSchedule[0].part[0].toUpperCase() + exerciseSchedule[0].part.substring(1)}</div>
                    <button>Details</button>
                </div>
            </div>

            {exerciseSchedule.map((listItem) => {
                return <ExerciseListItem
                    key={listItem.id}
                    id={listItem.id}
                    part={listItem.part}
                    exercises={listItem.exercises}
                    timestamp={listItem.timestamp}
                    exercisesDoneToday={exercisesDoneToday}
                    setExercisesDoneToday={setExercisesDoneToday}
                />
            })}

            <div className={styles.container}>
                <button onClick={updateTimestamps}>Done</button>
            </div>

        </div>
    );
}

export default Home;
