import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPhotoByIdQuery, useGetPostByIdQuery } from '../../services/cardsApi';
import { CombinedData } from '../../models/CombinedData';
import styles from './CardDetailPage.module.css';

const CardDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

     // Convert id to a number for API queries
     const numericId = Number(id);

    // Fetch data for posts and photos
    const { data: post, error: postError, isLoading: postLoading } = useGetPostByIdQuery(numericId);
    const { data: photo, error: photoError, isLoading: photoLoading } = useGetPhotoByIdQuery(numericId); 
    const [combinedData, setCombinedData] = useState<CombinedData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (post && photo) {
            // Combine post and photo data
            const combined = {
                id: post.id,
                title: post.title,
                body: post.body,               
                url: photo ? photo.url : '', 
                thumbnailUrl: photo ? photo.thumbnailUrl : '', 
            };
            setCombinedData(combined);
        } else if (postError || photoError) {
            setError('Failed to fetch data');
        }
    }, [post, photo, postError, photoError]);

    if (postLoading && photoLoading) {
        return <>Loading card...</>;
    }

    if (postError || photoError || error) {
        return <>Something went wrong: {postError || photoError || error}</>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Card {combinedData?.id}</h1>
            <h2 className={styles.subtitle}>Title: {combinedData?.title}</h2>
            <p className={styles.description}>Description: {combinedData?.body}</p>
            {combinedData?.url ? (
                <img src={combinedData?.url} alt={combinedData?.title} className={styles.image} />
            ) : (
                <div className={styles.noImage}>No image available</div>
            )}
            <button className={styles.button} onClick={() => navigate(-1)}>Back to List</button>
        </div>
    );
};

export default CardDetailPage;
