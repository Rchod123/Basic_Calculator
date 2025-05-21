export const CalculatorValues: Array<{
  operation: string;
  value: string;
  colorChange?: Boolean;
}> = [
  {
    operation: 'clear',
    value: 'AC',
  },
  {
    operation: 'inverse',
    value: '+|_',
  },
  {
    operation: 'percentage',
    value: '%',
  },
  {
    operation: 'division',
    value: '÷',
    colorChange: true,
  },
  {
    operation: 'number',
    value: '7',
  },
  {
    operation: 'number',
    value: '8',
  },
  {
    operation: 'number',
    value: '9',
  },
  {
    operation: 'multiple',
    value: 'x',
    colorChange: true,
  },
  {
    operation: 'number',
    value: '4',
  },
  {
    operation: 'number',
    value: '5',
  },
  {
    operation: 'number',
    value: '6',
  },
  {
    operation: 'subtract',
    value: '-',
    colorChange: true,
  },
  {
    operation: 'number',
    value: '1',
  },
  {
    operation: 'number',
    value: '2',
  },
  {
    operation: 'number',
    value: '3',
  },
  {
    operation: 'addition',
    value: '+',
    colorChange: true,
  },
  {
    operation: 'mode',
    value: '☼',
  },
  {
    operation: 'number',
    value: '0',
  },
  {
    operation: 'number',
    value: '.',
  },
  {
    operation: 'equals',
    value: '=',
    colorChange: true,
  },
];
