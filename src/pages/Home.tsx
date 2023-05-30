import { Dispatch, SetStateAction, useState } from 'react';
import ExerciseListItem from '../components/ExerciseListItem';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from './Home.module.css';

const Home = ({ setPage }: { setPage: Dispatch<SetStateAction<number>> }) => {

    const [exerciseSchedule, setExerciseSchedule] = useLocalStorage<Array<{ part: string, exercises: number, timestamp: number, id: number }>>('SCHEDULE', [
        { part: 'chest', exercises: 4, timestamp: 1682899200000, id: 0 },
        { part: 'biceps', exercises: 3, timestamp: 1682899200000, id: 1 },
        { part: 'forearms', exercises: 2, timestamp: 1682899200000, id: 2 },
        { part: 'triceps', exercises: 3, timestamp: 1682899200000, id: 3 },
        { part: 'back', exercises: 4, timestamp: 1682899200000, id: 4 },
        { part: 'shoulders', exercises: 4, timestamp: 1682899200000, id: 5 },
        { part: 'legs', exercises: 4, timestamp: 1682899200000, id: 6 }
    ]);

    const [liftLogs, setLiftLogs] = useLocalStorage<Array<{ id: number, exercises: number }>>('LIFTLOGS', []);

    const initialzeExercisesDoneToday: Array<{ id: number, exercises: number }> = [];
    exerciseSchedule.forEach(listItem => {
        if (Math.floor((Date.now() - listItem.timestamp) / (1000 * 60 * 60)) < 12) initialzeExercisesDoneToday.push({ id: listItem.id, exercises: listItem.exercises });
    });

    const [exercisesDoneToday, setExercisesDoneToday] = useState<Array<{ id: number, exercises: number }>>(initialzeExercisesDoneToday);

    const updateTimestamps = () => {
        const updatedExerciseSchdeule = exerciseSchedule.map(listItem => {
            if (exercisesDoneToday.find(obj => obj.id === listItem.id)) return { ...listItem, timestamp: Date.now() };
            return listItem;
        }).sort((a, b) => a.timestamp - b.timestamp || a.id - b.id);
        setExerciseSchedule(updatedExerciseSchdeule);

        const updatedLogs: Array<{ id: number, exercises: number }> = [...liftLogs, ...exercisesDoneToday];
        setLiftLogs(updatedLogs);
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

            <div >
                <button onClick={() => { setPage(1) }}>Stats</button>
            </div>

        </div>
    );
}

export default Home;
