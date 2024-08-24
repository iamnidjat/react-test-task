import React from 'react';
import { Link } from 'react-router-dom';
import { CombinedData } from '../../models/CombinedData';
import styles from './CardItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';

interface CardItemProps {
  card: CombinedData;
  onLike: () => void;
  onDelete: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onLike, onDelete }) => {
  return (
    <div className={styles.card}>
      <Link className={styles.link} to={`/cards/${card.id}`}>
        <img src={card.thumbnailUrl} alt={card.title} />
        <p>{card.body}</p>
      </Link>
      <div className={styles.buttons}>
        <button
          className={`${styles.likeButton} ${card.liked ? 'active' : ''}`}
          style={{ backgroundColor: card.liked ? 'lightgreen' : 'white' }}
          onClick={onLike}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <button className={styles.deleteButton} onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        </div>
    </div>
  );
};

export default CardItem;
