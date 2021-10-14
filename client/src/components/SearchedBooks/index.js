import * as React from 'react';
import DisplayBooks from '../DisplayBooks';
import { QUERY_BOOK } from '../../utils/queries';
import { useQuery } from '@apollo/client';

export default function SimplePaper() {
    const { loading, data } = useQuery(QUERY_BOOK);
    if (loading) {
        return <h1>Loading...</h1>
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