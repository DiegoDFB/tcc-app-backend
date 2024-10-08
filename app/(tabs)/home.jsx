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


const radius = 45;
const circunference = radius * Math.PI * 2;
const duration = 2000;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);


const Home = () => {

  const height = useSharedValue(130);

  const showExpandableAction = () => {
    setShowExpandable(!showExpandable);
    if (showExpandable) {
      height.value = withTiming(300, {duration: 500});
    }
    else {
      height.value = withTiming(130, {duration: 500});
    }
  }

  useEffect(() => {
    showToast();
    strokeOffset.value = 0;
    strokeOffsetAdd.value = 0;
    strokeOffsetSub.value = 50;
    strokeOffsetMult.value = 100;
    strokeOffsetDiv.value = 0;
  }, []);


  const { nome } = useLocalSearchParams();
  const { sobrenome } = useLocalSearchParams();
  const [estadoConexao, setEstadoConexao] = useState(false)
  const [showExpandable, setShowExpandable] = useState(false)
  

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
  const strokeOffsetAdd = useSharedValue(circunference);
  const strokeOffsetSub = useSharedValue(circunference);
  const strokeOffsetMult = useSharedValue(circunference);
  const strokeOffsetDiv = useSharedValue(circunference);

  const percentage = useDerivedValue(() => {
    const number = ((circunference - strokeOffset.value) / circunference ) * 100;
    return withTiming(number, { duration: duration });
  });

  const percentageAdd = useDerivedValue(() => {
    const number = ((circunference - strokeOffsetAdd.value) / circunference ) * 100;
    return withTiming(number, { duration: duration });
  });

  const percentageSub = useDerivedValue(() => {
    const number = ((circunference - strokeOffsetSub.value) / circunference ) * 100;
    return withTiming(number, { duration: duration });
  });

  const percentageMult = useDerivedValue(() => {
    const number = ((circunference - strokeOffsetMult.value) / circunference ) * 100;
    return withTiming(number, { duration: duration });
  });

  const percentageDiv = useDerivedValue(() => {
    const number = ((circunference - strokeOffsetDiv.value) / circunference ) * 100;
    return withTiming(number, { duration: duration });
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: "#75BFEC",
    };
  });
  const animatedCirclePropsAdd = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffsetAdd.value, { duration: duration }),
      stroke: "#75BFEC",
    };
  });
  const animatedCirclePropsSub = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffsetSub.value, { duration: duration }),
      stroke: "#75BFEC",
    };
  });
  const animatedCirclePropsMult = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffsetMult.value, { duration: duration }),
      stroke: "#75BFEC",
    };
  });
  const animatedCirclePropsDiv = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffsetDiv.value, { duration: duration }),
      stroke: "#75BFEC",
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)}% `
    }
  });
  const animatedTextPropsAdd = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentageAdd.value)}% `
    }
  });
  const animatedTextPropsSub = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentageSub.value)}% `
    }
  });
  const animatedTextPropsMult = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentageMult.value)}% `
    }
  });
  const animatedTextPropsDiv = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentageDiv.value)}% `
    }
  });

  const animatedTextSubProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)}% de acertos`
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

            <View className="w-full h-[950px] mt-5
            bg-white rounded-3xl items-start mb-20"
            style={{
              elevation: 20,
              shadowColor: '#52006A'
            }}>
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
              <TouchableOpacity
                  onPress={showExpandableAction}
                  className="w-[94%] h-[130] bg-third">
                <Animated.View className="w-[94%]
                bg-white rounded-3xl -mt-60 flex-row ml-3"
                style={{
                  height: height,
                  elevation: 10,
                  shadowColor: '#52006A'
                }}
                >                 
                      <Svg 
                      height="110px"
                      width="110px"
                      viewBox="0 0 100 100"
                      className="mt-3 ml-2"
                      >
                        <Circle 
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#E7E7E7"
                        fill="transparent"
                        strokeWidth={10} />

                        <AnimatedCircle
                        animatedProps={animatedCirclePropsAdd}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        strokeWidth={10}
                        strokeDasharray={`${radius * Math.PI * 2}`}
                        strokeLinecap={'round'} />
                      </Svg>

                      <View className="w-[240] h-[100] justify-center mt-3 ml-3">
                        <Text className="text-2xl font-pbold mb-3">
                          Adição
                        </Text>

                        <AnimatedText className="text-xl font-pbold"
                        editable={false}
                        style={{ color: 'black' }}
                        animatedProps={animatedTextPropsAdd}>
                          de acertos
                        </AnimatedText>
                      </View>                  
                </Animated.View>
              </TouchableOpacity>

              <View className="w-[94%] h-[130px]
               bg-white rounded-3xl items-center justify-around flex-row ml-3 mt-6"
               style={{
                elevation: 10,
                shadowColor: '#52006A'
              }}
              >                   
                    <Svg 
                    height="80%"
                    width="80%"
                    viewBox="0 0 100 100"
                    className="-mt-42 -ml-12"
                    >
                      <Circle 
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#E7E7E7"
                      fill="transparent"
                      strokeWidth={10} />

                      <AnimatedCircle
                      animatedProps={animatedCirclePropsSub}
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      strokeWidth={10}
                      strokeDasharray={`${radius * Math.PI * 2}`}
                      strokeLinecap={'round'} />
                    </Svg>

                    <View className="w-[240] h-[100] justify-center -mt-42">
                      <Text className="text-2xl font-pbold mb-3">
                        Subtração
                      </Text>

                      <AnimatedText className="text-xl font-pbold"
                      editable={false}
                      style={{ color: 'black' }}
                      animatedProps={animatedTextPropsSub}>
                        de acertos
                      </AnimatedText>
                    </View>                  
                
              </View>
              <View className="w-[94%] h-[130px]
               bg-white rounded-3xl items-center justify-around flex-row ml-3 mt-6"
               style={{
                elevation: 10,
                shadowColor: '#52006A'
              }}
              >                   
                    <Svg 
                    height="80%"
                    width="80%"
                    viewBox="0 0 100 100"
                    className="-mt-42 -ml-12"
                    >
                      <Circle 
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#E7E7E7"
                      fill="transparent"
                      strokeWidth={10} />

                      <AnimatedCircle
                      animatedProps={animatedCirclePropsMult}
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      strokeWidth={10}
                      strokeDasharray={`${radius * Math.PI * 2}`}
                      strokeLinecap={'round'} />
                    </Svg>

                    <View className="w-[240] h-[100] justify-center -mt-42">
                      <Text className="text-2xl font-pbold mb-3">
                        Multiplicação
                      </Text>

                      <AnimatedText className="text-xl font-pbold"
                      editable={false}
                      style={{ color: 'black' }}
                      animatedProps={animatedTextPropsMult}>
                        de acertos
                      </AnimatedText>
                    </View>                  
                
              </View>
              <View className="w-[94%] h-[130px]
               bg-white rounded-3xl items-center justify-around flex-row ml-3 mt-6"
               style={{
                elevation: 10,
                shadowColor: '#52006A'
              }}
              >                   
                    <Svg 
                    height="80%"
                    width="80%"
                    viewBox="0 0 100 100"
                    className="-mt-42 -ml-12"
                    >
                      <Circle 
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#E7E7E7"
                      fill="transparent"
                      strokeWidth={10} />

                      <AnimatedCircle
                      animatedProps={animatedCirclePropsDiv}
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      strokeWidth={10}
                      strokeDasharray={`${radius * Math.PI * 2}`}
                      strokeLinecap={'round'} />
                    </Svg>

                    <View className="w-[240] h-[100] justify-center -mt-42">
                      <Text className="text-2xl font-pbold mb-3">
                        Divisão
                      </Text>

                      <AnimatedText className="text-xl font-pbold"
                      editable={false}
                      style={{ color: 'black' }}
                      animatedProps={animatedTextPropsDiv}>
                        de acertos
                      </AnimatedText>
                    </View>                  
                
              </View>
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