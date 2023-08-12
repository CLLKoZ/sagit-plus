export const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#ACACAC' : 'white',
    color: 'black',
    textAlign: 'left',
    height: '25px',
    paddingTop:'0px',
  }),
  input: (provided) => ({
    ...provided,
    color: '#ACACAC',
  }),
  singleValue: (provided) => ({
    ...provided,
    textAlign: 'left',
    color: '#ACACAC',
  }),
};