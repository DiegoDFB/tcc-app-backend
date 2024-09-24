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
  primeiroNome: Yup.string().required('É necessário inserir seu primeiro nome').label("PrimeiroNome"),
  sobrenome: Yup.string().required('É necessário inserir seu sobrenome').label("Sobrenome"),
  email: Yup.string().required('É obrigatório inserir um endereço de email').email('É necessário inserir um email válido').label("Email"),
  password: Yup.string().required('É obrigatório inserir uma senha').min(4, 'A senha deve ter pelo menos 4 caracteres').label("Password"),
  confirmPassword: Yup.string().required('É obrigatório confirmar a senha').label("Password").oneOf([Yup.ref("password"), null], "As senhas devem ser iguais"),
})

const SignUp = () => {

  const [showPassword, setshowPassword] = useState(false)

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://192.168.0.146:3000/register', {
        nome: values.primeiroNome,
        sobrenome: values.sobrenome,
        email: values.email,
        password: values.password,
      });
      if (response.data.success) {
        Alert.alert("Sucesso", 'Sua conta foi criada com sucesso.');
        router.push({
          pathname:"/(tabs)/home",
          params: { nome: values.primeiroNome } });
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Este email já foi cadastrado. Tente novamente.');
    }
  };

  return (
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
          >Crie sua conta
          </Text>
          <Formik
            initialValues={{ primeiroNome: '', sobrenome: '', email: '', password: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleBlur,
              handleChange,
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
                        value={values.primeiroNome}
                        onChangeText={handleChange("primeiroNome")}
                        onBlur={handleBlur("primeiroNome")}
                        placeholder='Primeiro nome'
                    />
                  </View>
                </View>
                {errors.primeiroNome && touched.primeiroNome && (
                  <Text 
                  className="text-sm text-red-500 ml-2 text-semibold font-psemibold mt-2"
                  >{errors.primeiroNome}</Text>
                )}

                <View className={`space-y-2 mt-3`}>

                <View className="border-2 border-gray-300 w-full h-16 px-4 
                bg-white rounded-2xl focus:border-secondary items-center flex-row">
                  <TextInput 
                      className="flex-1 text-black font-psemibold text-base"
                      value={values.sobrenome}
                      onChangeText={handleChange("sobrenome")}
                      onBlur={handleBlur("sobrenome")}
                      placeholder='Sobrenome'
                  />
                </View>
                </View>
                {errors.sobrenome && touched.sobrenome && (
                <Text 
                className="text-sm text-red-500 ml-2 text-semibold font-psemibold mt-2"
                >{errors.sobrenome}</Text>
                )}

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

                <View className={`space-y-2 mt-3`}>

                <View className="border-2 border-gray-300 w-full h-16 px-4 
                bg-white rounded-2xl focus:border-secondary items-center flex-row">
                  <TextInput 
                      className="flex-1 text-black font-psemibold text-base"
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      secureTextEntry={!showPassword}
                      placeholder='Confirme sua senha'
                  />
                  <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                      <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6"
                      resizeMode='contain' />
                  </TouchableOpacity>
                </View>
                </View>
                {errors.confirmPassword && touched.confirmPassword && (
                <Text 
                className="text-sm text-red-500 ml-2 text-semibold font-psemibold mt-2"
                >{errors.confirmPassword}</Text>
                )}

                <CustomButton
                title="Criar conta"
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
              Já possui conta?
            </Text>
            <Link href="/sign-in" className='text-lg font-pregular text-secondary'>Entrar</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
