import { Text, View } from "react-native"
import { RootSiblingParent } from "react-native-root-siblings"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "../constants";
import MenuItemLarge from "../components/MenuItemLarge";
import init from 'react_native_mqtt';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const topicsub = "lediclient";
const topic = "lediserver";

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync: {
    }
});

const Brinquedo = () => {

    useEffect(() => {
        console.log("mounted");
        setIsLED1Disabled(true);
    }, [])

    const onMessageArrived =(message)=> {
        console.log("onMessageArrived: "+message.payloadString);
        if (message.payloadString == "ledl:pong") {
            onLED1Connect();
        }
    }

    const onLED1Connect =()=>{
        console.log("led connected");
        setIsLED1Disabled(false);
    }

    const onConnect =()=> {
        console.log("onConnect");
        client.subscribe(topicsub);
        client.publish(topic, "ping");
    }
    
    const onLight =() => {
        client.publish(topic, "power");
        //console.log("onlight":);
    }

    const [isLED1Disabled, setIsLED1Disabled] = useState(0);
    const client = new Paho.MQTT.Client('133.211.13.211', 9001, 'clientname');
    client.onMessageArrived = onMessageArrived;
    client.connect({ onSuccess:onConnect, useSSL: false, userName: 'mqttusername', password: 'mqttpassword'});

    return (
    <RootSiblingParent>
        <SafeAreaView className="bg-white h-full w-full">
                <View className="items-center h-[30%]">       
                    <Text>Isaac cabeçudo</Text>

                    <MenuItemLarge 
                    disabled={isLED1Disabled}
                    onPress={onLight}
                    imageSource={images.foxToy}
                    label="Conectar"
                    bgColor="bg-lightblue"
                    extraStyles={"w-[45%] h-[100%] mt-0 justify-center"}
                    exStylesTouch={"h-[90%] w-[100%] mb-2"}
                    exStylesImage={"h-[70%] w-[70%] mt-3"}
                    />
                </View>
        </SafeAreaView>

    </RootSiblingParent>
    )
}

export default Brinquedo