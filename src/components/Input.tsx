import {StyleProp, Text, TextInput, TextInputProps, TextStyle, View} from "react-native";

interface InputProps extends TextInputProps{
    label: string;
}

const Input = (props: InputProps) => {
    const {label, ...otherProps} = props
    return(
        <View>
            <Text style={styles.labelStyle}>{label}</Text>
            <TextInput
                {...otherProps}
                style={styles.inputStyle}
            />
        </View>
    )
}

const styles : {labelStyle: StyleProp<TextStyle>, inputStyle: StyleProp<TextStyle>} = {
    labelStyle: {
        fontSize: 17,
        backgroundColor: 'white',
        textDecorationLine: 'underline',

    },
    inputStyle: {
        fontSize: 21,
        backgroundColor: 'white'
    }
}

export default Input
