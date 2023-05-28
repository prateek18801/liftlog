import ExerciseListItem from '../components/ExerciseListItem';
import styles from './Home.module.css';

const Home: React.FC = () => {
    return (
        <div className={styles.page}>
            
            <div className={styles.schedule}>
                <div>Today's Schedule</div>
                <div className={styles.dflex}>
                    <div>Shoulders</div>
                    <button>Details</button>
                </div>
            </div>

            <ExerciseListItem />

        </div>
    );
}

export default Home;
