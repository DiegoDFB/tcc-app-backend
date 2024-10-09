import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, Dimensions, TextInput } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../../constants'
import CustomButton from '../../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-toast-message';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import ExpandableActionComponent from '../../components/ExpandableActionComponent';


const radius = 45;
const circunference = radius * Math.PI * 2;
const duration = 2000;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);


const Home = () => {

  useEffect(() => {
    showToast();
    strokeOffset.value = 0;
  }, []);


  const { nome } = useLocalSearchParams();
  const { sobrenome } = useLocalSearchParams();
  const [estadoConexao, setEstadoConexao] = useState(false)
  

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Login feito com sucesso',
      text2: 'Seja bem-vindo! 👋'
    });
  }

  const updateProgress = (newProgress) => {
    strokeOffset.value = withTiming(circunference * (1 - newProgress / 100), { duration: 2000 });
  }

  const strokeOffset = useSharedValue(circunference);

  const percentage = useDerivedValue(() => {
    const number = ((circunference - strokeOffset.value) / circunference ) * 100;
    return withTiming(number, { duration: duration });
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: "#75BFEC",
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)}% `
    }
  });

  return <RootSiblingParent>
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
            <Text
            className="text-3xl font-bold text-white mt-10 pl-2 ml-5
            text-left bg-third rounded-xl w-[90vw]"
            style={{
              elevation: 20,
              shadowColor: '#52006A'
            }}
            >Bem-vindo, {nome}!
            </Text>

          <View className="w-full items-center min-h-[85vh] px-4">

          <View className="w-[90vw] h-[250] mt-5
            justify-around flex-row bg-fifth rounded-2xl"
            style={{
              elevation: 20,
              shadowColor: '#52006A'
            }}>
              {estadoConexao ? 
                <View className="w-[39vw] justify-center">
                  <Image 
                    source={images.foxHappy}
                    className="w-[50vw] -ml-7 absolute"
                    resizeMode="contain"
                  />
                </View>
              : <View className="w-[39vw] justify-center">
                  <Image 
                    source={images.foxHappy}
                    className="w-[50vw] -ml-7 absolute"
                    resizeMode="contain"
                  />
                </View>}
              {estadoConexao ? 
                <View className="w-[45vw] pl-1 rounded-xl h-[20vh] mt-10 justify-center">
                   <Text
                      className="text-xl font-bold text-left -ml-3 text-center"
                      >Seu brinquedo está
                      </Text>
                      <View>
                        <CustomButton 
                          title="Conectado"
                          containerStyles="w-[35vw] mt-5 ml-3 border-2 border-third rounded-3xl bg-third"
                          textStyles="text-white"
                        />
                      </View>
                </View> :
                    <View className="w-[39vw] pl-1 rounded-xl h-[22vh] mt-5 items-center">
                      <Text
                      className="text-xl font-bold text-left pl-1"
                      >Parece que você ainda não conectou seu brinquedo!
                      </Text>
                      <View>
                        <CustomButton 
                          title="Conectar"
                          handlePress={() => setEstadoConexao(!estadoConexao)}
                          containerStyles="w-[35vw] mt-7 border-2 border-third rounded-3xl bg-white"
                          textStyles="text-third"
                        />
                      </View>
                    </View>
                  }
            </View>

            <View className="w-full h-[170px] mt-5
            justify-around flex-row bg-white rounded-3xl"
            style={{
              elevation: 20,
              shadowColor: '#52006A'
            }}>
              <View className="w-[100px] h-[140px]
              items-center flex-column mt-5"
              >
                <TouchableOpacity 
                  onPress={ () =>
                    {
                      router.push({
                        pathname:"/profile",
                        params: { nome: nome, sobrenome: sobrenome } });
                    }
                   }
                  className="w-[100px] h-[100px] rounded-xl
                  justify-center flex-row bg-lightblue items-center"
                  style={{
                    elevation: 10,
                    shadowColor: '#52006A'
                  }}
                >
                  <Image 
                    source={images.perfilHeadphones}
                    className="w-[80%] h-[80%]"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Perfil</Text>
              </View>

              <View className="w-[100px] h-[140px]
              items-center flex-column mt-5">
                <TouchableOpacity 
                  onPress={ () => router.push('/sign-in') }
                  className="w-[100px] h-[100px] rounded-xl
                  justify-center flex-row bg-lightgreen items-center"
                  style={{
                    elevation: 10,
                    shadowColor: '#52006A'
                  }}
                >
                  <Image 
                    source={icons.notebook}
                    className="w-[80%] h-[80%]"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Aprender</Text>
              </View>

              <View className="w-[100px] h-[140px]
              items-center flex-column mt-5">
                <TouchableOpacity 
                  onPress={ () => router.push('/sign-in') }
                  className="w-[100px] h-[100px] rounded-xl
                  justify-center flex-row bg-lightyellow items-center"
                  style={{
                    elevation: 10,
                    shadowColor: '#52006A'
                  }}
                >
                  <Image 
                    source={icons.interrogation}
                    className="w-[80%] h-[80%] ml-1"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Ajuda</Text>
              </View>
              
            </View>

            <View className="w-full h-fit mt-5
            bg-white rounded-3xl items-start mb-20"
            >
              <View className="h-[70px]">
                <ScrollView className="flex-row mt-5"
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                  <View className="bg-fifth h-[30px] rounded-3xl w-[100px] mb-5 justify-center items-center
                  mr-3 ml-5"
                  style={{
                    elevation: 10,
                    shadowColor: '#52006A'
                  }}>
                    <Text className="text-xl font-pbold">
                      Hoje
                    </Text>
                  </View>
                  <View className="bg-fifth h-[30px] rounded-3xl w-[100px] mb-5 justify-center items-center
                  mr-3"
                  style={{
                    elevation: 10,
                    shadowColor: '#52006A'
                  }}>
                    <Text className="text-xl font-pbold">
                      Semana
                    </Text>
                  </View>
                  <View className="bg-fifth h-[30px] rounded-3xl w-[100px] mb-5 justify-center items-center
                  mr-3"
                  style={{
                    elevation: 10,
                    shadowColor: '#52006A'
                  }}>
                    <Text className="text-xl font-pbold">
                      Mês
                    </Text>
                  </View>
                  <View className="bg-fifth h-[30px] rounded-3xl w-[100px] mb-5 justify-center items-center
                  mr-5"
                  style={{
                    elevation: 10,
                    shadowColor: '#52006A'
                  }}>
                    <Text className="text-xl font-pbold">
                      Tudo
                    </Text>
                  </View>
                </ScrollView>
              </View>
              <View className="w-full h-[480px] mt-5
              justify-around bg-white rounded-3xl items-center"
              >
                    <AnimatedText className="text-3xl font-pbold absolute -mt-56"
                    editable={false}
                    style={{ color: 'black' }}
                    animatedProps={animatedTextProps}>

                    </AnimatedText>

                    <Text className="absolute mt-5 text-xl font-pbold -mt-48">
                      de acertos
                    </Text>
                    
                    <Svg 
                    height="50%"
                    width="50%"
                    viewBox="0 0 100 100"
                    className="-mt-80"
                    >
                      <Circle 
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#E7E7E7"
                      fill="transparent"
                      strokeWidth={10} />

                      <AnimatedCircle
                      animatedProps={animatedCircleProps}
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      strokeWidth={10}
                      strokeDasharray={`${radius * Math.PI * 2}`}
                      strokeLinecap={'round'} />
                    </Svg>

                    <Text  className="text-black text-2xl font-bold -mt-24 absolute">
                      de 10 questões respondidas
                    </Text>
                
              </View>
              
              <ExpandableActionComponent
                title={"Adição"}
                radius={radius}
                animatedCirclePropsAdd={animatedCircleProps}
                animatedTextPropsAdd={animatedTextProps}
              >
              </ExpandableActionComponent>

              <ExpandableActionComponent
                title={"Subtração"}
                radius={radius}
                animatedCirclePropsAdd={animatedCircleProps}
                animatedTextPropsAdd={animatedTextProps}
                extraStyles={"mt-5"}
              >
              </ExpandableActionComponent>
              
              <ExpandableActionComponent
                title={"Multiplicação"}
                radius={radius}
                animatedCirclePropsAdd={animatedCircleProps}
                animatedTextPropsAdd={animatedTextProps}
                extraStyles={"mt-5"}
              >
              </ExpandableActionComponent>

              <ExpandableActionComponent
                title={"Divisão"}
                radius={radius}
                animatedCirclePropsAdd={animatedCircleProps}
                animatedTextPropsAdd={animatedTextProps}
                extraStyles={"mt-5"}
              >
              </ExpandableActionComponent>

              
            </View>

          </View>
        </ScrollView>

        <StatusBar backgroundColor='#FF8229' 
        style='light' />
      </SafeAreaView>
      <Toast visible={true} >Hello !</Toast>
    </RootSiblingParent>
}

export default Home