import React, {useEffect, useState} from 'react';
import styles from "@/styles/Posts.module.scss";
import {Post, useGetPostsQuery} from "@/modules/redux/store/apis/postsApi";
import PostItem from "./PostItem";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/messages/ErrorMessage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";

const Posts = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const {data, error, isFetching} = useGetPostsQuery({page, limit});
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        data && setPosts(prev => [...prev, ...data])
    }, [data])

    const loadNewPosts = () => {
        setPage(prev => prev + 1)
    }

    const refresh = () => {
        if(page !== 1) {
            setPosts([])
            setPage(1)
        }
    }

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const {scrollHeight, scrollTop, clientHeight} = event.target as HTMLDivElement;

        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
            loadNewPosts()
        }
    }

    return (
        <div className={styles.container} onScroll={handleScroll}>
            <div className={styles.refresh} onClick={refresh}>
                <FontAwesomeIcon icon={faRefresh}/>
            </div>
            {posts.map(post => <PostItem post={post}/>)}
            {error && <ErrorMessage message={'status' in error ? `Error ${error.status}` : error.message ? error.message : 'Unexpected error'}/>}
            <div hidden={!isFetching} className={styles.loader}>
                <Loader/>
            </div>
        </div>
    );
};

export default Posts;