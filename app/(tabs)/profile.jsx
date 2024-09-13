import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import axios from 'axios';
import { router } from 'expo-router';

const Profile = () => {

  const desconectar = async (values) => {
    router.push("/sign-in");
  };

  return (
    <CustomButton
      title="Desconectar"
      handlePress={desconectar}
      containerStyles="mt-10"
    />
  )
}

export default Profile

const styles = StyleSheet.create({})