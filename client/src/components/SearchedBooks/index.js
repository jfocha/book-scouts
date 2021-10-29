import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import DisplayBooks from '../DisplayBooks';
import { QUERY_BOOK } from '../../utils/queries';
import { useQuery } from '@apollo/client';

export default function SimplePaper() {
    const { loading, data } = useQuery(QUERY_BOOK);
    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <h1>Loading...</h1>
                <LinearProgress />
            </Box>

        );
    }
    const getAllBooks = data?.books || [];

    const bookDisplay = getAllBooks.map(book => {
        return book;
    })

    return (
        <div>
            <DisplayBooks data={bookDisplay} />
        </div>
    );
}