import {View, ViewProps, ViewStyle} from "react-native";

interface SpacerProps extends ViewProps{
    orientation?: string;
    size?: number;
}

enum Orientation {
    VERTICAL= "VERTICAL",
    HORIZONTAL = "HORIZONTAL"
}

const Spacer = (props: SpacerProps) => {
    const {orientation, size, ...otherProps} = props

    return (
        !orientation || orientation === Orientation.HORIZONTAL ?(
            <View style={{...styles.horizontalStyles, height: size ?? 1}}>

            </View>
        )
            :(
                <View style={{...styles.verticalStyles, width: size ?? 1}}>

                </View>
            )
    )
}

const styles: {verticalStyles: ViewStyle, horizontalStyles: ViewStyle} = {
    verticalStyles: {
        height: 1,
        width: "100%"
    },
    horizontalStyles: {
        width: 1,
        height: "100%"
    }
}

export default Spacer
