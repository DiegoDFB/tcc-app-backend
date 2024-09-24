import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'


const AuthLayout = () => {
  return (
    <>
      <Stack initialRouteName="sign-in">
        <Stack.Screen 
          name="sign-in"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="sign-up"
          options={{
            headerShown: false
          }}
        />
      </Stack>

      <StatusBar backgroundColor='#FF8229'
      style='light'/>
    </>
  )
}

export default AuthLayout
