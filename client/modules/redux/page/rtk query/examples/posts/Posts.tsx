import React, {useEffect, useRef, useState} from 'react';
import styles from "@/styles/Posts.module.scss";
import {Post, useGetPostsQuery} from "@/modules/redux/store/apis/postsApi";
import PostItem from "./PostItem";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/messages/ErrorMessage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";

const Posts = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [isEnd, setIsEnd] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const {data, error, isFetching} = useGetPostsQuery({page, limit});

    useEffect(() => {
        if(page === 1) {
            data && setPosts(data)
        } else {
            data && setPosts(prev => [...prev, ...data])
        }
        setIsProcessing(false)
        page === 20 && setIsEnd(true)
    }, [data])

    const loadNewPosts = () => {
        setPage(prev => prev + 1)
    }

    const refresh = () => {
        if(page !== 1) {
            containerRef.current && containerRef.current.scrollTo(0, 0)
            setTimeout(() => {
                setPage(1)
                setIsEnd(false)
            }, 500 + page * 50)
        }
    }

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const {scrollHeight, scrollTop, clientHeight} = event.target as HTMLDivElement;

        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1 && !isProcessing && !isEnd) {
            loadNewPosts()
            setIsProcessing(true)
        }
    }

    return (
        <div
            className={styles.container}
            onScroll={handleScroll}
            ref={containerRef}
        >
            <div className={styles.refresh} onClick={refresh}>
                <FontAwesomeIcon icon={faRefresh}/>
            </div>
            {posts.map(post => <PostItem post={post}/>)}
            {isEnd ? <div className={styles.end}>
                There are no more posts :(
            </div> : <div hidden={!isFetching && !isProcessing} className={styles.loader}>
                <Loader/>
            </div>}
            {error && <ErrorMessage message={'status' in error ? `Error ${error.status}` : error.message ? error.message : 'Unexpected error'}/>}
        </div>
    );
};

export default Posts;