// import React from "react";
import { React, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import LogoImg from './573.jpg';
import ModalDialog from '../ModalDialog';

// const handleClose = () => {
//     setOpen(false);
//   };

const LandingPage = () => (
    <View style={styles.container}>
    <ImageBackground source={LogoImg} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Welcome to our Library</Text>
      {/* <ModalDialog open={open} handleClose={handleClose} /> */}
    </ImageBackground>
  </View>
);


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
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});

export default LandingPage;
