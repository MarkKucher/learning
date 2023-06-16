import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: ({page, limit}) => `posts?_limit=${limit}&_page=${page}`
        })
    })
})

export const { useGetPostsQuery } = postsApi