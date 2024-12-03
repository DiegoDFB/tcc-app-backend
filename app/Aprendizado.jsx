import { ScrollView, Text, View } from "react-native"
import { RootSiblingParent } from "react-native-root-siblings"
import { SafeAreaView } from "react-native-safe-area-context"
import MenuItem from "../components/MenuItem"
import icons from '../constants/icons';
import { router, useLocalSearchParams } from "expo-router";
import DateRangeSelector from "../components/DateRangeSelector";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import ResultSummary from "../components/ResultSummary";
import NoDataComponent from "../components/NoDataComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";


const radius = 45;
const circunference = radius * Math.PI * 2;
const duration = 1000;

const Aprendizado = () => {

      const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias
      const [selectedDateRange, setSelectedDateRange] = useState('today');
      const [filteredAnswers, setFilteredAnswers] = useState({});
      const [questTotal, setQuestTotal] = useState([0, 0, 0]);

      
      const answersByDate = categorias.reduce((acc, item) => {
        if (!acc[item.date]) {
          acc[item.date] = [];
        }
        acc[item.date].push(item);
        return acc;
      }, {});
    
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

      const carregarDados = async () => {
        try {
          const jsonData = await AsyncStorage.getItem('@dados_quiz');
          if (jsonData) {
            const data = JSON.parse(jsonData);
            setCategorias(data); // Atualiza o estado das categorias
            console.log('Dados carregados:', data);
            setNoData(false);
          } else {
            console.log('Nenhum dado encontrado no AsyncStorage');
            setNoData(true);
          }
        } catch (error) {
          console.error('Erro ao carregar dados do AsyncStorage:', error);
        }
      };
    
      // Carrega os dados ao montar o componente
      useEffect(() => {
        carregarDados();
      }, []);

    return (
    <RootSiblingParent>
        <SafeAreaView className="bg-white h-full w-full">
            <ScrollView>
                <View className="items-center h-full">       

                    <View className="w-full h-fit
                    rounded-3xl items-center mb-10">
                    
                        <DateRangeSelector 
                            selectedDateRange={selectedDateRange} 
                            setSelectedDateRange={setSelectedDateRange} 
                        />
                        
                        <View className="w-full mt-2 rounded-3xl items-center">
                            {!noData ? (
                            <ResultSummary 
                                questTotal={questTotal} 
                                animatedTextProps={animatedTextProps} 
                                animatedCircleProps={animatedCircleProps} 
                                categorias={categorias} 
                                filteredAnswers={filteredAnswers} 
                            />
                            ) : (
                            <NoDataComponent
                            selectedDateRange={selectedDateRange} 
                            />
                            )}
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    </RootSiblingParent>
    )
}

export default Aprendizado