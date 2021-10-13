import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Auth from '../../utils/auth';
import { QUERY_BOOK } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import { CHECKOUT_BOOK } from '../../utils/mutations';

export default function SimplePaper() {
    const [checkoutBookData, { error }] = useMutation(CHECKOUT_BOOK);
    console.log(error);

    const { loading, data } = useQuery(QUERY_BOOK);
    if (loading) {
        return <h1>Loading...</h1>
    }
    const getAllBooks = data?.books || [];

    const books = getAllBooks.map(book => {
        return book;
    })

    const loggedIn = Auth.loggedIn();

    const checkoutBookHandler = (bookNumber) => {
        console.log("checkoutBookHandler " + loggedIn + " " + typeof bookNumber + " " + bookNumber);
        checkoutBookData({
            variables: { checkoutBookBookId: bookNumber }
        });
    };

    const centerFormat = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
    }

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row'
            }}>
                
            {books.map((book, i) => (
                <Stack spacing={2} direction="row">
                <Box
                    key={i}
                    // noWrap
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
                            <img src={books[i].ISBN} alt="" style={{
                                height: 180,
                                width: 135,
                            }} />
                        </div>
                        <Typography noWrap align={"center"} variant="body1"
                        >{books[i].title}</Typography>
                        <Typography noWrap align={"center"} variant="body2">by {books[i].author}</Typography>
                        <div style={{ padding: "15px" }}>
                            {/* <Stack spacing={2} direction="row"> */}
                                <Button variant="contained" fullWidth onClick={() => checkoutBookHandler(books[i]._id)}>Checkout</Button>
                            {/* </Stack> */}
                        </div>
                    </Paper>
                </Box>
                {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
                </Stack>
            ))}
            
        </div>
    );
}