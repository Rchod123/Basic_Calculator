import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ButtonProps} from '../utils/types';
import {heightPercentageToDP, widthPercentageToDP} from '../utils/responsive';

type ThemeType = {
  accent: string;
  buttonBg: string;
  accentText: string;
  mainText: string;
};

type Props = ButtonProps & { theme: ThemeType };

const ButtonText = ({text, onClick, colorChange, theme}: Props) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.7}
      style={[
        styles.mainContainer,
        { backgroundColor: colorChange ? theme.accent : theme.buttonBg },
      ]}
    >
      <View style={styles.innerShadow}>
        <Text
          style={[
            styles.textContainer,
            colorChange
              ? { color: theme.accentText, fontSize: heightPercentageToDP(3.5), fontWeight: 'bold' }
              : { color: theme.mainText },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  mainContainer: {
    height: heightPercentageToDP(9),
    width: widthPercentageToDP(20),
    borderRadius: heightPercentageToDP(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: heightPercentageToDP(0.5),
    marginHorizontal: widthPercentageToDP(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  innerShadow: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: heightPercentageToDP(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  textContainer: {
    fontWeight: '700',
    fontSize: heightPercentageToDP(2.5),
    letterSpacing: 1,
  },
});
