import { ScrollView, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import WelcomeComponent from '../../components/WelcomeComponent';
import MenuComponent from '../../components/MenuComponent';

const Home = () => {

  const { nome } = useLocalSearchParams();
  const { sobrenome } = useLocalSearchParams();
  const [estadoConexao, setEstadoConexao] = useState(false);

  return <RootSiblingParent>
    <SafeAreaView>
        <View className="bg-white h-full">
          <WelcomeComponent 
            nome={nome} 
            estadoConexao={estadoConexao} 
            setEstadoConexao={setEstadoConexao} 
          />

          <MenuComponent nome={nome} sobrenome={sobrenome} />
        </View>
      </SafeAreaView>
    </RootSiblingParent>
    
}

export default Home