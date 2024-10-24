import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../../constants'
import CustomButton from '../../components/CustomButton';
import { TouchableOpacity } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import ExpandableActionComponent from '../../components/ExpandableActionComponent';
import WelcomeComponent from '../../components/WelcomeComponent';


const radius = 45;
const circunference = radius * Math.PI * 2;
const duration = 1000;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const Home = () => {

  let categorias = [
    { nome: "Adição", acertos: 20, erros: 30, date: '2024-10-22' },
    { nome: "Subtração", acertos: 15, erros: 25, date: '2024-10-22' },
    { nome: "Multiplicação", acertos: 5, erros: 5, date: '2024-10-13' },
    { nome: "Divisão", acertos: 5, erros: 5, date: '2024-10-13' },
  ];

  const answersByDate = categorias.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {});

  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [filteredAnswers, setFilteredAnswers] = useState({});
  const [questTotal, setQuestTotal] = useState([0, 0, 0]);

  useLayoutEffect(() => {

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
      else {
        strokeOffset.value = circunference * (1 - 0 / 100);
      }
    }

  }, [answersByDate, selectedDateRange, circunference, porcentagemTotal, getStartDate, getEndDate, filteredAnswers, questTotal, percentage, strokeOffset]);

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

  if (questTotal[0] === 0) {
    setNoData(true);
  }
  else {
    setNoData(false);
  }

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
  const [estadoConexao, setEstadoConexao] = useState(false);
  const [noData, setNoData] = useState(false);

  const strokeOffset = useSharedValue(circunference);
  const number = useSharedValue(0);

  const percentage = useDerivedValue(() => {
    return Math.round(number.value = ((circunference - strokeOffset.value) / circunference ) * 100).toString();
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: "#75BFEC",
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    return  { text: `${percentage.value + '% '}`, defaultValue: `${percentage.value + '% '}`}
  });

  return <RootSiblingParent>
      <SafeAreaView className="bg-white h-full">
          <ScrollView>

          <WelcomeComponent 
            nome={nome} 
            estadoConexao={estadoConexao} 
            setEstadoConexao={setEstadoConexao} 
          />

            <View className="items-center">
              <View className="w-[90%] h-[150px] mt-3
              justify-around flex-row bg-white rounded-3xl"
              style={{
                elevation: 20,
                shadowColor: '#52006A'
              }}>
                <View className="w-[100px] h-[140px]
                items-center flex-column mt-3"
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
                items-center flex-column mt-3">
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
                items-center flex-column mt-3">
                  <TouchableOpacity 
                    onPress={ () =>
                      {
                        router.push({
                          pathname:"/Ajuda"});
                      }
                    }
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

            

            <View className="w-[90%] h-fit mt-3
            bg-white rounded-3xl items-center mb-10"
            
            >
              
              <View className="h-[70px] w-[95%]">
                <ScrollView className="flex-row mt-5"
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity className="bg-fifth h-[30px] rounded-3xl 
                  w-[90px] mb-5 justify-center items-center mr-3"
                    onPress={() => setSelectedDateRange('today')}
                    style={{
                      backgroundColor: selectedDateRange === 'today' ? '#F07900' : '#FAC68E',
                      borderRadius: 10,
                    }}
                  >
                    <Text>Hoje</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-fifth h-[30px] rounded-3xl 
                  w-[90px] mb-5 justify-center items-center mr-3"
                    onPress={() => setSelectedDateRange('thisWeek')}
                    style={{
                      backgroundColor: selectedDateRange === 'thisWeek' ? '#F07900' : '#FAC68E',
                      borderRadius: 10,
                    }}
                  >
                    <Text>Semana</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-fifth h-[30px] rounded-3xl 
                  w-[90px] mb-5 justify-center items-center mr-3"
                    onPress={() => setSelectedDateRange('thisMonth')}
                    style={{
                      backgroundColor: selectedDateRange === 'thisMonth' ? '#F07900' : '#FAC68E',
                      borderRadius: 10,
                    }}
                  >
                    <Text>Mês</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-fifth h-[30px] rounded-3xl 
                  w-[90px] mb-5 justify-center items-center mr-3"
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
                {!noData ?
                <View className="w-full mt-2
                bg-white rounded-3xl items-center">
                  <View className="w-full h-[480px]
                  bg-white rounded-3xl items-center -mb-28"
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
                      
                    />
                    ))}

              </View>
              :
            <View className="w-full h-[40%] mt-3
            bg-white rounded-3xl items-center mb-10"
            style={{
              elevation: 20,
              shadowColor: '#52006A'
            }}>
              <View className="h-full w-[90%] items-center justify-center">
                <Text className="text-2xl font-pbold text-center">
                  Nenhuma questão foi respondida neste período de tempo!
                </Text>
              </View>
            </View>
            }

          </View>
          </View>
        </ScrollView>

        <StatusBar backgroundColor='#FF8229' 
        style='light' />
      </SafeAreaView>
    </RootSiblingParent>
}

export default Home