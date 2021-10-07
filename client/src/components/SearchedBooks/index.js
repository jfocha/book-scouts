import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { QUERY_BOOK } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import { useMutation } from '@apollo/react-hooks';
import { CHECKOUT_BOOK } from '../../utils/mutations';

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

// const [checkoutBookData, { error }] = useMutation(CHECKOUT_BOOK);
const checkoutBookHandler = () => {

}


export default function SimplePaper() {
    const { loading, data } = useQuery(QUERY_BOOK);
    if (loading) {
        return <h1>Loading...</h1>
    }
    const getAllBooks = data?.books || [];
    console.log("searchedBooks " + getAllBooks);

    const books = getAllBooks.map(book => {
        return book.title;
    })
    
    const booksId = getAllBooks.map(book => {
        return book._id;
    })
    

    console.log("Books " + books);

    return (
        <div>
            {books.map((book, i) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 300,
                            height: 320,
                            transform: 'translateZ(0px)',
                            // flexGrow: 1
                        },
                    }}
                >
                    <Paper elevation={5}>
                        {/* <img src="" /> */}

                        <div>{books[i]}</div>


                        <div>Author</div>
                        <div>Description</div>
                        {/* <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                    ))}
                </SpeedDial> */}
                        <Stack spacing={2} direction="row">
                            
                            <Button variant="outlined" onClick={() => checkoutBookHandler(booksId[i])}>Checkout</Button>
                        </Stack>

                    </Paper>

                </Box>
            ))}
        </div>
    );
}