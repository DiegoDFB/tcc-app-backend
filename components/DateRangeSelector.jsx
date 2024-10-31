import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

const DateRangeSelector = ({ selectedDateRange, setSelectedDateRange }) => {
  const dateRanges = [
    { label: 'Hoje', value: 'today' },
    { label: 'Semana', value: 'thisWeek' },
    { label: 'Mês', value: 'thisMonth' },
    { label: 'Todos', value: 'allTime' },
  ];

  return (
    <View className="h-[70px] w-[90%] bg-white rounded-3xl pl-2"
    style={{ elevation: 10, shadowColor: '#52006A' }}>
      <View className="flex-row mt-5" horizontal={true} showsHorizontalScrollIndicator={false}>
        {dateRanges.map((range) => (
          <TouchableOpacity
            key={range.value}
            className="bg-fifth h-[30px] rounded-3xl w-[75px] mb-5 
            justify-center items-center mr-3 pt-1"
            onPress={() => setSelectedDateRange(range.value)}
            style={{
              backgroundColor: selectedDateRange === range.value ? '#F07900' : '#FAC68E',
              borderRadius: 10,
            }}
          >
            <Text className="font-psemibold"
            style={{
              color: selectedDateRange === range.value ? '#FFF' : '#000',
            }}>
            {range.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DateRangeSelector;