import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, Dimensions, TextInput } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../../constants'
import CustomButton from '../../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-toast-message';
import Svg, { Circle, err } from 'react-native-svg';
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import ExpandableActionComponent from '../../components/ExpandableActionComponent';


const radius = 45;
const circunference = radius * Math.PI * 2;
const duration = 1000;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const Home = () => {

  let categorias = [
    { nome: "Adição", acertos: 20, erros: 5, date: '2024-10-13' },
    { nome: "Subtração", acertos: 5, erros: 5, date: '2024-10-13' },
    { nome: "Multiplicação", acertos: 5, erros: 5, date: '2024-10-13' },
    { nome: "Divisão", acertos: 5, erros: 5, date: '2024-10-13' },
    { nome: "Adição", acertos: 5, erros: 5, date: '2024-10-09' },
    { nome: "Subtração", acertos: 5, erros: 5, date: '2024-10-09' },
    { nome: "Multiplicação", acertos: 5, erros: 5, date: '2024-10-09' },
    { nome: "Divisão", acertos: 5, erros: 5, date: '2024-10-09' },
    { nome: "Adição", acertos: 5, erros: 5, date: '2024-10-01' },
    { nome: "Subtração", acertos: 5, erros: 5, date: '2024-10-01' },
    { nome: "Multiplicação", acertos: 5, erros: 5, date: '2024-10-01' },
    { nome: "Divisão", acertos: 5, erros: 5, date: '2024-10-01' },
    { nome: "Adição", acertos: 5, erros: 5, date: '2024-08-01' },
    { nome: "Subtração", acertos: 5, erros: 5, date: '2024-08-01' },
    { nome: "Multiplicação", acertos: 5, erros: 5, date: '2024-08-01' },
    { nome: "Divisão", acertos: 5, erros: 5, date: '2024-08-01' },
  ];

  const answersByDate = categorias.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {});

  const [selectedDateRange, setSelectedDateRange] = useState('allTime');
  const [filteredAnswers, setFilteredAnswers] = useState({});
  const [questTotal, setQuestTotal] = useState([0, 0, 0]);

  useEffect(() => {
    if (Object.keys(answersByDate).length === 0) {
      return;
    }

    const calculateFilteredAnswers = () => {
      const filteredAnswers = {};
      Object.keys(answersByDate).forEach((date) => {
        answersByDate[date].forEach((item) => {
          if (!filteredAnswers[item.nome]) {
            filteredAnswers[item.nome] = [];
          }
          filteredAnswers[item.nome].push(item);
        });
      });

      const startDate = getStartDate();
      const endDate = getEndDate();

      const filteredAnswersByDate = {};
      Object.keys(filteredAnswers).forEach((nome) => {
        filteredAnswersByDate[nome] = filteredAnswers[nome].filter((item) => {
          if (!startDate || !endDate) {
            return true;
          }
          return item.date >= startDate && item.date <= endDate;
        });
      });

      return filteredAnswersByDate;
    };

    const filteredAnswersByDate = calculateFilteredAnswers();
    const total = porcentagemTotal(filteredAnswersByDate);

    if (JSON.stringify(filteredAnswers) !== JSON.stringify(filteredAnswersByDate) || JSON.stringify(questTotal) !== JSON.stringify(total)) {
      setFilteredAnswers(filteredAnswersByDate);
      setQuestTotal(total);
      if (total[1] + total[2] !== 0) {
        strokeOffset.value = circunference * (1 - ((total[1] / (total[1] + total[2])) * 100) / 100);
      }
    }
  }, [answersByDate, selectedDateRange, circunference, porcentagemTotal, getStartDate, getEndDate, filteredAnswers, questTotal]);

const getStartDate = useCallback(() => {
  if (selectedDateRange === 'today') {
    return new Date().toISOString().split('T')[0];
  } else if (selectedDateRange === 'thisWeek') {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return sevenDaysAgo.toISOString().split('T')[0];
  } else if (selectedDateRange === 'thisMonth') {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return firstDayOfMonth.toISOString().split('T')[0];
  } else {
    return null;
  }
}, [selectedDateRange]);

const getEndDate = useCallback(() => {
  if (selectedDateRange === 'today') {
    return new Date().toISOString().split('T')[0];
  } else if (selectedDateRange === 'thisWeek') {
    return new Date().toISOString().split('T')[0];
  } else if (selectedDateRange === 'thisMonth') {
    return new Date().toISOString().split('T')[0];
  } else {
    return null;
  }
}, [selectedDateRange]);

const porcentagemTotal = useCallback((answers) => {
  if (Object.keys(answers).length === 0) {
    return [0, 0, 0];
  }

  let acertosTotal = 0;
  let errosTotal = 0;
  let questTotal = [];

  Object.keys(answers).forEach((date) => {
    answers[date].forEach((item) => {
      acertosTotal += item.acertos;
      errosTotal += item.erros;
    });
  });

  questTotal = [acertosTotal + errosTotal, acertosTotal, errosTotal];
  return questTotal;
}, []);

  const filterAnswersByDate = (startDate, endDate) => {
    const filteredAnswers = {};
    Object.keys(answersByDate).forEach((date) => {
      if (!startDate && !endDate) {
        filteredAnswers[date] = answersByDate[date];
      } else if (date >= startDate && date <= endDate) {
        filteredAnswers[date] = answersByDate[date];
      }
    });
    return filteredAnswers;
  };



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
                  <TouchableOpacity className="bg-fifth h-[30px] rounded-3xl 
                  w-[100px] mb-5 justify-center items-center mr-3"
                    onPress={() => setSelectedDateRange('today')}
                    style={{
                      backgroundColor: selectedDateRange === 'today' ? '#F07900' : '#FAC68E',
                      borderRadius: 10,
                    }}
                  >
                    <Text>Hoje</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-fifth h-[30px] rounded-3xl 
                  w-[100px] mb-5 justify-center items-center mr-3"
                    onPress={() => setSelectedDateRange('thisWeek')}
                    style={{
                      backgroundColor: selectedDateRange === 'thisWeek' ? '#F07900' : '#FAC68E',
                      borderRadius: 10,
                    }}
                  >
                    <Text>Semana</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-fifth h-[30px] rounded-3xl 
                  w-[100px] mb-5 justify-center items-center mr-3"
                    onPress={() => setSelectedDateRange('thisMonth')}
                    style={{
                      backgroundColor: selectedDateRange === 'thisMonth' ? '#F07900' : '#FAC68E',
                      borderRadius: 10,
                    }}
                  >
                    <Text>Mês</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-fifth h-[30px] rounded-3xl 
                  w-[100px] mb-5 justify-center items-center mr-3"
                    onPress={() => setSelectedDateRange('allTime')}
                    style={{
                      backgroundColor: selectedDateRange === 'allTime' ? '#F07900' : '#FAC68E',
                      borderRadius: 10,
                    }}
                  >
                    <Text>Todos</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
              <View className="w-full h-[480px] mt-5
              bg-white rounded-3xl items-center -mb-32"
              >
                    <AnimatedText className="text-3xl font-pbold absolute mt-10"
                    editable={false}
                    style={{ color: 'black' }}
                    animatedProps={animatedTextProps}>

                    </AnimatedText>

                    <Text className="absolute mt-20 text-xl font-pbold">
                      de acertos
                    </Text>
                    
                    <Svg 
                    height="50%"
                    width="50%"
                    viewBox="0 0 100 100"
                    className="-mt-10"
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

                    <Text 
                    className="text-black text-2xl font-bold mt-48 absolute">
                      de {questTotal[0]} questões respondidas
                    </Text>

                    <View className="flex-row items-center mt-10">
                      <Image
                      source={icons.check}
                      className="w-[50px] h-[50px]"
                      resizeMode="contain"
                      />

                      <Text
                      className="text-xl font-pbold ml-5">
                      {questTotal[1]} acertos
                      </Text>
                    </View>

                    <View className="flex-row items-center mt-5 -ml-6">
                      <Image
                      source={icons.x}
                      className="w-[50px] h-[50px]"
                      resizeMode="contain"
                      />

                      <Text
                      className="text-xl font-pbold ml-5">
                      {questTotal[2]} erros
                      </Text>
                    </View>
                
              </View>

              {Object.keys(categorias.reduce((acc, item) => {
                if (!acc[item.nome]) {
                  acc[item.nome] = item;
                }
                return acc;
              }, {})).map((nome) => (
                <ExpandableActionComponent
                  key={nome}
                  title={nome}
                  animatedCirclePropsAdd={animatedCircleProps}
                  animatedTextPropsAdd={animatedTextProps}
                  acertos={filteredAnswers[nome] ? filteredAnswers[nome].reduce((acc, item) => acc + item.acertos, 0) : 0}
                  erros={filteredAnswers[nome] ? filteredAnswers[nome].reduce((acc, item) => acc + item.erros, 0) : 0}
                  extraStyles={"mt-5"}
                />
              ))}

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