import styles from './card.module.scss';

export function Card() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Card!</h1>
    </div>
  );
}

export default Card;
