import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
                variables: {checkoutBookBookId:bookNumber} 
            });
        };

        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                }}>
                {books.map((book, i) => (
                    <Box
                        key={i}
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
                            <img src={books[i].ISBN} alt="" style={{
                    height: 200,
                    width: 150,
                    
                    
                }}/>
                            <div>{books[i].title}</div>
                            <div>by {books[i].author}</div>
                            <Stack spacing={2} direction="row">
                                <Button variant="outlined" onClick={() => checkoutBookHandler(books[i]._id)}>Checkout</Button>
                            </Stack>
                        </Paper>
                    </Box>
                ))}
            </div>
        );
    }