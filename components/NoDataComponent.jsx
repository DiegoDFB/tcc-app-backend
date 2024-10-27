import { Text, View } from "react-native";

const NoDataComponent = ({ selectedDateRange }) => {

  let dateText = 'Hoje';
  
  switch(selectedDateRange) {
    case 'today':
      dateText = "hoje";
      break;
    case 'thisWeek':
      dateText = "nesta semana";
      break;
    case 'thisMonth':
      dateText = "neste mês";
      break;
    default:
      dateText = "";
  }

  return <View className="w-full h-[50%] mt-3 bg-white rounded-3xl items-center mb-14"
  style={{ elevation: 10, shadowColor: '#52006A' }}>
      <View className="h-full w-[90%] items-center justify-center">
        <Text className="text-2xl font-pbold text-center">
          Nenhuma questão foi respondida {dateText}!
        </Text>
      </View>
    </View>
};

export default NoDataComponent;