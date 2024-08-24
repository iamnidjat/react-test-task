import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../models/Post';
import { Photo } from '../models/Photo';

export const cardsApi = createApi({
    reducerPath: "cards",
    keepUnusedDataFor: 300, // cache lifetime for all endpoints  
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getPhotos: builder.query<Photo[], void>({
            query: () => 'photos',
        }),
        getPosts: builder.query<Post[], void>({
            query: () => 'posts',
        }),
        getPhotoById: builder.query<Photo, number>({
            query: (id: number) => `photos/${id}`,
        }),
        getPostById: builder.query<Photo, number>({
            query: (id: number) => `posts/${id}`,
        })
    })
})

export const { useGetPostsQuery, useGetPhotosQuery, useGetPhotoByIdQuery, useGetPostByIdQuery } = cardsApi;