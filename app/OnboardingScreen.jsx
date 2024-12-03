import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { setItem } from './utils/asyncStorage';
import { images } from '../constants';

const {width} = Dimensions.get('window');

const OnboardingScreen = () => {

    const router = useRouter();

    const navigation = useNavigation();

    const handleDone = ()=>{
        router.push({ pathname: "/sign-in" })
        setItem('onboarded', '1');
    }

    const doneButton = ({...props}) =>{
        return (
            <TouchableOpacity {...props}
            className="p-3 pl-5 pr-5 mr-2 bg-white rounded-3xl">
                <Text className="font-psemibold">Continuar</Text>
            </TouchableOpacity>
        )
    }

    const nextButton = ({...props}) =>{
        return (
            <TouchableOpacity {...props}
            className="p-3 pl-5 pr-5 mr-2 bg-white rounded-3xl">
                <Text className="font-psemibold">Próximo</Text>
            </TouchableOpacity>
        )
    }

    const skipButton = ({...props}) =>{
        return (
            <TouchableOpacity {...props}
            className="p-3 pl-5 pr-5 ml-2 bg-white rounded-3xl">
                <Text className="font-psemibold">Pular</Text>
            </TouchableOpacity>
        )
    }

  return (
    <View className="bg-white flex-1">
        <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            NextButtonComponent={nextButton}
            DoneButtonComponent={doneButton}
            SkipButtonComponent={skipButton}
            bottomBarHighlight={false}
            containerStyles={{paddingHorizontal: 15}}
            pages={[
                {
                    backgroundColor: '#CDE0FF',
                    image: (
                        <View className="w-[300px] h-[400px]">
                            <LottieView
                            source={require('../assets/animations/stars.json')}
                            autoPlay loop
                            style={{width: width*2,
                            height: width*2,
                            marginTop: -300,
                            marginLeft: -250,
                            zIndex: 1
                            }}
                            />
                            <Image 
                            source={images.foxHappyCircle}
                            className="w-[100%] h-[100%] absolute -ml-1"
                            resizeMode="contain"
                            />
                        </View>
                    ),
                    title: 'Estimule o aprendizado da matemática',
                    subtitle: 'Com a raposa Lulu, a educação e diversão vão além do celular',

                },
                {
                    backgroundColor: '#FAC898',
                    image: (
                        <View>
                            <LottieView
                            source={require('../assets/animations/pencilandbook.json')}
                            autoPlay loop
                            style={{width: width*0.9, height: width }}
                            />
                        </View>
                    ),
                    title: 'Estatísticas detalhadas',
                    subtitle: 'Para acompanhar o progresso de seu filho nas primeiras etapas da aprendizagem',
                },
                {
                    backgroundColor: '#C7F4D3',
                    image: (
                        <View>
                            <LottieView
                            source={require('../assets/animations/book.json')}
                            autoPlay loop
                            style={{width: width*1.5, height: width*1.5, marginBottom: -80, marginTop: -110 }}
                            />
                        </View>
                    ),
                    title: 'Lições lúdicas e divertidas',
                    subtitle: 'Interação lúdica com o brinquedo e no aplicativo para incentivar o aprendizado',
                },
        ]}
        />
    </View>
  )
}

export default OnboardingScreen