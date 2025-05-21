import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonText from './src/components/ButtonText';
import {CalculatorValues} from './src/constants/calculatorConstants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from './src/utils/responsive';

const lightTheme = {
  gradient: ['#f8fafc', '#e2e8f0'],
  displayBg: 'rgba(255,255,255,0.95)',
  mainText: '#222',
  expressionText: '#555',
  accent: '#ffa07a',
  buttonBg: 'rgba(240,240,240,0.95)',
  accentText: '#fff',
};

const darkTheme = {
  gradient: ['#232526', '#414345'],
  displayBg: 'rgba(30,30,30,0.95)',
  mainText: '#fff',
  expressionText: '#bbb',
  accent: '#ffa07a',
  buttonBg: 'rgba(60,60,60,0.95)',
  accentText: '#222',
};

const App = () => {
  const [inValue, setInValue] = useState('0');
  const [expression, setExpression] = useState('');
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? darkTheme : lightTheme;

  const getSymbol = (operation: string) => {
    switch (operation) {
      case 'addition': return '+';
      case 'subtract': return '-';
      case 'multiple': return '*';
      case 'division': return '/';
      case 'percentage': return '/100';
      default: return '';
    }
  };

  const evaluate = (expr: string) => {
    try {
      let result = eval(expr);
      console.log(result,"from result");
      return result.toString();
    } catch {
      return 'Error';
    }
  };

  const onSubmit = (value: {operation: string; value: string}) => {
    switch (value.operation) {
      case 'clear':
        setInValue('0');
        setExpression('');
        break;
      case 'inverse':
        if (inValue !== '0' && inValue !== 'Error') {
          const newValue = (parseFloat(inValue) * -1).toString();
          setInValue(newValue);
          setExpression(newValue);
        }
        break;
      case 'mode':
        setIsDark(prev => !prev);
        break;
      case 'number':
        if (inValue === '0' || inValue === 'Error') {
          setInValue(value.value);
          setExpression(value.value);
        } else {
          setInValue(prev => prev + value.value);
          setExpression(prev => prev + value.value);
        }
        break;
      case 'addition':
      case 'subtract':
      case 'multiple':
      case 'division':
        setInValue(prev => prev + value.value);
        setExpression(prev => prev + getSymbol(value.operation));
        break;
      case 'percentage':
        setInValue(prev => prev + '%');
        setExpression(prev => prev + getSymbol(value.operation));
        break;
      case 'equals': {
        let exp = expression;
        if (/[0-9]$/.test(inValue)) exp = expression;
        exp = exp.replace(/%/g, '/100');
        const result = evaluate(exp);
        setInValue(result);
        setExpression(result);
        break;
      }
      default:
        break;
    }
  };

  return (
    <LinearGradient
      colors={theme.gradient}
      style={styles.gradient}
    >
      <SafeAreaView style={{flex: 1,marginTop: heightPercentageToDP(14)}}>
        <View style={styles.container}>
          <View style={[styles.displayCard, {backgroundColor: theme.displayBg, shadowColor: isDark ? '#000' : '#aaa'}]}>
            {/* <Text style={[styles.expressionText, {color: theme.expressionText}]} numberOfLines={1} ellipsizeMode="head">
              {expression || ' '}
            </Text> */}
            <Text style={[styles.mainText, {color: theme.mainText}]} numberOfLines={1} ellipsizeMode="head">
              {inValue}
            </Text>
          </View>
          <FlatList
            data={CalculatorValues}
            columnWrapperStyle={{gap: widthPercentageToDP(3)}}
            contentContainerStyle={{rowGap: heightPercentageToDP(1)}}
            style={styles.flatList}
            renderItem={({item}) => (
              <ButtonText
                text={item.value}
                onClick={() => onSubmit(item)}
                colorChange={item.colorChange ?? false}
                theme={theme}
              />
            )}
            numColumns={4}
            key={isDark ? 'dark' : 'light'}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default App;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: heightPercentageToDP(2),
  },
  displayCard: {
    width: widthPercentageToDP(90),
    minHeight: heightPercentageToDP(18),
    borderRadius: 24,
    marginBottom: heightPercentageToDP(2),
    padding: widthPercentageToDP(5),
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  mainText: {
    fontSize: heightPercentageToDP(6),
    fontWeight: 'bold',
    marginTop: heightPercentageToDP(1),
    textAlign: 'right',
  },
  expressionText: {
    fontSize: heightPercentageToDP(2.5),
    textAlign: 'right',
    marginBottom: heightPercentageToDP(0.5),
  },
  flatList: {
    flex: 2,
    width: widthPercentageToDP(100),
    paddingLeft: widthPercentageToDP(1),
  },
});
