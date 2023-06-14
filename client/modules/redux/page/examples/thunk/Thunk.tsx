import React, {useEffect} from 'react';
import styles from "@/styles/Thunk.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchRandomUser, selectThunkExample} from "@/modules/redux/store/slices/thunkSlice";
import {AppDispatch} from "@/modules/redux/store/configureStore";
import styled from "styled-components";
import ErrorMessage from "@/components/messages/ErrorMessage";
import Loader from "@/modules/redux/page/examples/thunk/Loader";

const StyledButton = styled.button`
  background: ${props => props.disabled ? 'gray' : 'dodgerblue'};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

const Thunk = () => {
    const {user, loading, error} = useSelector(selectThunkExample);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={styles.container}>
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