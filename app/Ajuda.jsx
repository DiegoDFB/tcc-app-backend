import { ScrollView, Text, View } from "react-native"
import { RootSiblingParent } from "react-native-root-siblings"
import { SafeAreaView } from "react-native-safe-area-context"
import ExpandableComponent from "../components/ExpandableComponent"

const Ajuda = () => {
    return (
    <RootSiblingParent>
        <SafeAreaView className="bg-white h-full w-full">
            <Text className="font-pbold text-2xl mt-52 ml-4">Página em Desenvolvimento!</Text>
        </SafeAreaView>

    </RootSiblingParent>
    )
}

export default Ajuda