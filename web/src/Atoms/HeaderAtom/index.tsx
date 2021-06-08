import { Fragment } from "react";
import { ScrollView, Text } from 'react-native';
import { styles } from './styles';

interface Header {
    id: number;
    task: string;
}

interface HeaderAtomProps {
    headerText: Array<Header>;
    onPress: (a: number) => void;
}

const HeaderAtom = ({ headerText, onPress }: HeaderAtomProps) => {
    return (
        <ScrollView
        horizontal={true}
        contentContainerStyle={styles.headerContainer}
        >
            <Text 
            style={styles.headerText}
            onPress={()=>onPress(0)}
            >Home</Text>
            {headerText && headerText.length > 0 &&
                headerText.map((item: Header, key: number)=>{
                    return (
                        <Fragment key={key}>
                            <Text style={styles.headerText}>{" > "}</Text>
                            <Text 
                            style={styles.headerText}
                            onPress={()=>onPress(item.id)}
                            >
                                {item.task}
                            </Text>
                        </Fragment>
                    )
                })
            }
        </ScrollView>
    )
}

export default HeaderAtom;
