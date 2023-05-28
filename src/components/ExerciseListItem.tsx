import styles from './ExerciseListItem.module.css';

const ExerciseListItem: React.FC = () => {
    return (
        <div className={styles.card}>
            <div className={styles.wrapper}>
                <div style={{ color: '#FFFFFF' }}>#</div>
                <input type='checkbox' name='legs' id='legs' />
                <div className={styles.part}>Legs</div>
            </div>
            <div className={styles.wrapper}>
                <button>-</button>
                <input type='number' defaultValue='04' />
                <button>+</button>
            </div>
            <div className={styles.duration}>27 May, 1 Day</div>
        </div>
    );
}

export default ExerciseListItem;
