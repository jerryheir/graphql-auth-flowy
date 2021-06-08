import { TextInput } from 'react-native'
import { styles } from "./styles";

interface InputAtomProps {
    onChangeText: (e: string) => void;
    value?: string;
    style?: any;
    placeholder: string;
    onSubmitEditing: (a: any) => void;
    autoFocus?: boolean;
    onBlur?: () => void;
    onKeyPress?: () => void;
}

const InputAtom = ({ onChangeText, placeholder, value, style, onSubmitEditing, autoFocus, onBlur, onKeyPress }: InputAtomProps) => {
    const onKey = (e: any) => {
        if (e.key === "Backspace" && !value && onKeyPress){
            onKeyPress();
        }
    }
    return (
        <div>
            <TextInput 
            blurOnSubmit={true}
            multiline={true}
            autoFocus={autoFocus}
            placeholder={placeholder}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
            value={value}
            numberOfLines={2}
            maxLength={80}
            style={[styles.inputView, style, { outline: "none" }]}
            onKeyPress={onKey}
            />
        </div>
    )
}

export default InputAtom;
