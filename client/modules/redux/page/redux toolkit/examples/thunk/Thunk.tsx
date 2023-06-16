import React, {useCallback, useEffect, useState} from 'react';
import styles from "@/styles/Thunk.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchRandomUser, selectThunkExample} from "@/modules/redux/store/slices/thunkSlice";
import {AppDispatch} from "@/modules/redux/store/configureStore";
import styled from "styled-components";
import ErrorMessage from "@/components/messages/ErrorMessage";
import Loader from "@/components/Loader";

const StyledButton = styled.button`
  background: ${props => props.disabled ? 'gray' : 'dodgerblue'};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

const Thunk = () => {
    const {user, loading, error} = useSelector(selectThunkExample);
    const [shouldResize, setShouldResize] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const condition = (width: number) => {
        if(width <= 550) {
            setShouldResize(true)
        } else {
            setShouldResize(false)
        }
    }

    let onResize = useCallback(() => {
        condition(window.innerWidth)
    }, [])

    useEffect(() => {
        condition(window.innerWidth)
        window.addEventListener('resize', onResize, {passive: true})
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <div className={styles.container} style={{height: (shouldResize && user) ? '505px' : '100%'}}>
            {user && loading === 'succeeded' && <div className={styles.userInfo}>
                <div>Id:</div><div>{user.id}</div>
                <div>Name:</div><div>{user.name}</div>
                <div>Username:</div><div>{user.username}</div>
                <div>Email:</div><div>{user.email}</div>
                <div>Phone:</div><div>{user.phone}</div>
            </div>}
            {error && <ErrorMessage message={error}/>}
            {loading === 'pending' && <Loader/>}
            <StyledButton
                disabled={loading === 'pending'}
                onClick={() => {dispatch(fetchRandomUser())}}
                className={styles.button}
            >
                Load user
            </StyledButton>
        </div>
    );
};

export default Thunk;