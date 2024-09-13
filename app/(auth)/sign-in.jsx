import { ScrollView, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { icons } from '../../constants'
import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('É obrigatório inserir um endereço de email').email('É necessário inserir um email válido').label("Email"),
  password: Yup.string().required('É obrigatório inserir uma senha').min(4, 'A senha deve ter pelo menos 4 caracteres').label("Password"),
})

const SignIn = () => {

  const [showPassword, setshowPassword] = useState(false)

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://192.168.0.146:3000/login', values);
      if (response.data.success) {
        router.push("/(tabs)/home");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", 'Email ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[10vh] px-4 my-6">
          <Image 
          source={images.logo}
          resizeMode='contain'
          className="w-[105px] h=[25px]" />

          <Text
          className="text-2xl text-white text-semibold font-psemibold"
          >Entre em sua conta
          </Text>
          <Formik
            initialValues={{ email: "", password: "" }}
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
                <View className={`space-y-2 mt-7`}>
                  <Text className="text-base text-gray-100 font-pmedium">Email</Text>

                  <View className="border-2 border-black-200 w-full h-16 px-4 
                  bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput 
                        className="flex-1 text-white font-psemibold text-base"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        keyboardType="email-address"
                    />
                  </View>
                </View>
                {errors.email && touched.email && (
                  <Text 
                  className="text-sm text-red-500 text-semibold font-psemibold mt-2"
                  >{errors.email}</Text>
                )}

                <View className={`space-y-2 mt-7`}>
                  <Text className="text-base text-gray-100 font-pmedium">Senha</Text>

                  <View className="border-2 border-black-200 w-full h-16 px-4 
                  bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput 
                        className="flex-1 text-white font-psemibold text-base"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6"
                        resizeMode='contain' />
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.password && touched.password && (
                  <Text 
                  className="text-sm text-red-500 text-semibold font-psemibold mt-2"
                  >{errors.password}</Text>
                )}

                <CustomButton
                  title="Entrar"
                  handlePress={handleSubmit}
                  containerStyles="mt-10"
                />

                </View>
            )
            }
          </Formik>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Não possui conta?
            </Text>
            <Link href="/sign-up" className='text-lg font-semibold text-secondary'>Registre-se</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
