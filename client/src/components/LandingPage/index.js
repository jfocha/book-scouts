import { React, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import LogoImg from './573.jpg';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ModalDialog from '../ModalDialog';

const LandingPage = () => {

  // declare a new state variable for modal open
  const [open, setOpen] = useState(false);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={LogoImg} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Welcome to our Library
          <Stack spacing={2} direction="row" style={{ justifyContent: 'center' }} m={2} pt={3}>
            <Button variant="contained" onClick={handleOpen}>Sign Up</Button>
          </Stack>
          <ModalDialog open={open} handleClose={handleClose} />
        </Text>
      </ImageBackground>
    </View>
  )
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: '100%',
    aspectRatio: 2,

  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 100,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});

export default LandingPage;
