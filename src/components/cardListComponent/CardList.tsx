import * as React from 'react'
import { useGetPostsQuery, useGetPhotosQuery } from '../../services/cardsApi'
import CardItem from '../cardItemComponent/CardItem';
import { useEffect, useState } from 'react';
import { CombinedData } from '../../models/CombinedData';
import styles from './CardList.module.css';

const CardList: React.FC = () => {
  const { data: posts, error: postsError, isLoading: postsLoading } = useGetPostsQuery();
  const { data: photos, error: photosError, isLoading: photosLoading } = useGetPhotosQuery();
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [likedCards, setLikedCards] = useState<{ [key: string]: boolean }>({});
  const [showLikedOnly, setShowLikedOnly] = useState(false); 

  useEffect(() => {
    if (posts && photos) {
      try {
        // Combine data from posts and photos
        const combined = posts.map(post => {
          const photo = photos.find(photo => photo.id === post.id);
          return {
            id: post.id,
            title: post.title,
            body: post.body,
            url: photo ? photo.url : '', 
            thumbnailUrl: photo ? photo.thumbnailUrl : '', 
          };
        });
        setCombinedData(combined);
      } catch (error) {
        setError('Failed to combine data');
      }
    }
  }, [posts, photos]);
  
  if (postsLoading && photosLoading) {
    return <>Loading cards...</>
  }

  if (photosError || postsError || error) {
    return <>Something went wrong: {postsError || photosError || error}</>
  }

  const cardsWithLikes = combinedData?.map((card: CombinedData) => ({
    ...card,
    liked: likedCards[card.id] ?? card.liked,
  }));


  const filteredCards = showLikedOnly
  ? cardsWithLikes?.filter((card: CombinedData) => card.liked)
  : cardsWithLikes;

  const handleDelete = (cardId: number) => {
    setCombinedData((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setShowLikedOnly(!showLikedOnly)}>
       {showLikedOnly ? 'Show all cards' : 'Show liked cards only'}
      </button>
      <div className={styles.cardList}>
        {filteredCards.length === 0 ? (
        <div className={styles.noElements}>
          {showLikedOnly ? 'There are no liked elements' : 'There are no elements'}
        </div>
        ) : (
        filteredCards.map((card: CombinedData) => (
          <CardItem
            key={card.id}
            card={card}
            onLike={() => {
              setLikedCards((prev) => ({
                ...prev,
                [card.id]: !card.liked,
              }));
            }}
            onDelete={() => handleDelete(card.id)}
          />
        )))}
      </div>
    </div>
  );
}

export default CardList;