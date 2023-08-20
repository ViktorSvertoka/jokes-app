import styles from './HighlightedJoke.module.css';

const HighlightedJoke = (props) => {
  return (
    <figure className={styles.joke}>
      <p>{props.text}</p>
      <figcaption>{props.topic}</figcaption>
    </figure>
  );
};

export default HighlightedJoke;
