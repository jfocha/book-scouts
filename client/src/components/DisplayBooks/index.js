import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import usePagination from '../AppPagination';
import Pagination from '@mui/material/Pagination';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { CHECKOUT_BOOK } from '../../utils/mutations';

export default function DisplayBooks(props) {

    const [checkoutBookData, { error }] = useMutation(CHECKOUT_BOOK);
    console.log(error);

    const [show, setShow] = useState(true);

    let [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const count = Math.ceil(props.data.length / PER_PAGE);
    const _DATA = usePagination(props.data, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
        console.log("Data " + props.data.books)
    };

    const checkoutBookHandler = async (bookNumber) => {
        console.log("checkoutBookHandler " + loggedIn + " " + typeof bookNumber + " " + bookNumber);
        

        try {
            const { data } = await checkoutBookData({
                variables: { checkoutBookBookId: bookNumber }
            });
            console.log(data);
        } catch (e) {
            setShow(true);
            console.error(e);
        }

    };

    const loggedIn = Auth.loggedIn();

    const centerFormat = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
    }

    return (
        <>
        {error && show && <Alert variant="filled" severity="error" onClose={() => {setShow(false)}}>{error.message}</Alert>}
            <Box
                py={3}
                style={{
                    stickToTop: {
                        width: '100%',
                        position: 'fixed',
                        top: 0,
                    }
                }}>
                <Pagination
                    count={count}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded" />
            </Box>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                }}
            >
                {_DATA.currentData().map((book, i) => (
                    <Box
                        key={book._id}
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 300,
                                height: 320,
                                transform: 'translateZ(0px)',
                            },
                        }}
                    >
                        <Paper elevation={5}>
                            <div style={centerFormat}>
                                <img src={book.ISBN} alt="" style={{
                                    height: 180,
                                    width: 135,
                                }} />
                            </div>
                            <Typography noWrap align={"center"} variant="body1"
                            >{book.title}</Typography>
                            <Typography noWrap align={"center"} variant="body2">by {book.author}</Typography>
                            <div style={{ padding: "15px" }}>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" fullWidth onClick={() => checkoutBookHandler(book._id)}>Checkout</Button>
                                    
                                </Stack>
                            </div>
                        </Paper>
                    </Box>
                ))}
            </div>
        </>
    );
}