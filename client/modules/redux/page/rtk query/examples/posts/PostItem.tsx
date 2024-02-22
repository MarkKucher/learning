import React from 'react';
import styles from '@/../../../../../../../server/styles/Posts.module.scss';
import {Post} from "../../../../store/apis/postsApi";

interface PostProps {
    post: Post;
}

const PostItem: React.FC<PostProps> = ({post}) => {
    return (
        <div className={styles.post__container}>
            <header className={styles.post__title}>
                {post.title}
                <div className={styles.post__id}>{post.id}</div>
            </header>
            <div className={styles.post__body}>{post.body}</div>
        </div>
    );
};

export default PostItem;