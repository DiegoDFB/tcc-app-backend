import { ScrollView, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import { Link, useRouter } from 'expo-router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { icons } from '../../constants'
import axios from 'axios';
import { RootSiblingParent } from "react-native-root-siblings";


const validationSchema = Yup.object().shape({
  email: Yup.string().required('É obrigatório inserir um endereço de email').email('É necessário inserir um email válido').label("Email"),
  password: Yup.string().required('É obrigatório inserir uma senha').min(4, 'A senha deve ter pelo menos 4 caracteres').label("Password"),
})

const SignIn = () => {

  const router = useRouter();

  const [showPassword, setshowPassword] = useState(false)

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://192.168.0.146:3000/login', { ...values });
      if (response?.data?.success) {
        if (router && router.push) {
          router.push({
            pathname:"/home",
            params: { nome: response?.data?.nome, sobrenome: response?.data?.sobrenome, email: response?.data?.email } });
        } else {
          console.error("Router object is null");
        }
      } else {
        alert(response?.data?.error || 'Email ou senha incorretos. Tente novamente.');
      }
    }  catch (error) {
      Alert.alert("Erro", 'Email ou senha incorretos. Tente novamente.');
    }
  };

  return <RootSiblingParent>
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
          <Image 
              source={images.foxLogin}
              className="w-[100vw] h-[300px]"
              resizeMode="contain"
            />
          <View className="w-full justify-center min-h-[10vh] px-4 my-6">

            <Text
            className="text-2xl text-black text-semibold font-psemibold"
            >Entre em sua conta
            </Text>
            <Formik
              initialValues={{ email: "a@a", password: "1234" }}
              onSubmit={handleLogin}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              })=>(
                <View>
                  <View className={`space-y-2 mt-3`}>

                    <View className="border-2 border-gray-300 w-full h-16 px-4 
                    bg-white rounded-2xl focus:border-secondary items-center flex-row">
                      <TextInput 
                          className="flex-1 text-black font-psemibold text-base"
                          value={values.email}
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          keyboardType="email-address"
                          placeholder='Email'
                      />
                    </View>
                  </View>
                  {errors.email && touched.email && (
                    <Text 
                    className="text-sm text-red-500 ml-2 text-semibold font-psemibold mt-2"
                    >{errors.email}</Text>
                  )}

                  <View className={`space-y-2 mt-3`}>

                    <View className="border-2 border-gray-300 w-full h-16 px-4 
                    bg-white rounded-2xl focus:border-secondary items-center flex-row">
                      <TextInput 
                          className="flex-1 text-black font-psemibold text-base"
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          secureTextEntry={!showPassword}
                          placeholder='Senha'
                      />
                      <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                          <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6"
                          resizeMode='contain' />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {errors.password && touched.password && (
                    <Text 
                    className="text-sm text-red-500 ml-2 text-semibold font-psemibold mt-2"
                    >{errors.password}</Text>
                  )}

                  <CustomButton
                    title="Entrar"
                    handlePress={handleSubmit}
                    containerStyles="mt-5 bg-third"
                    textStyles="text-white"
                  />

                  </View>
              )
              }
            </Formik>

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-400 font-pregular">
                Não possui conta?
              </Text>
              <Link href="/sign-up" className='text-lg font-pregular text-third'>Registre-se</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </RootSiblingParent>
}

export default SignIn
