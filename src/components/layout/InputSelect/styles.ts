/* eslint-disable @typescript-eslint/no-explicit-any */
export const selectStyles = (hasError: boolean) => ({
  container: (base: any) => ({
    ...base,
    width: '100%',
    height: '40px'
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#9A9FA5FF',
    fontSize: 15,
    fontWeight: 400,
    marginLeft: 0,
    marginRight: 0
  }),
  control: (base: any, state: any) => ({
    ...base,
    height: '40px',
    fontWeight: 700,
    outline: 'none',
    fontSize: 15,
    borderRadius: 6,
    width: '100%',
    borderColor: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: state.isFocused
      ? hasError
        ? '0 0 0 1px #F56969'
        : '0 0 0 1px #4849FF'
      : 0,
    border: hasError
      ? '1px solid #F56969'
      : state.isFocused
      ? '1px solid #4849FF'
      : '1px solid rgba(0, 0, 0, 0.23)',
    '&:hover': {
      borderColor: state.isFocused ? 'none' : 'rgba(75, 75, 75, 0.6)'
    }
  }),
  singleValue: (base: any) => ({
    ...base,
    marginLeft: 0,
    marginRight: 0,
    color: '#1A1D1F',
    fontSize: 15,
    fontWeight: 400
  }),
  option: (base: any, state: any) => ({
    ...base,
    paddingLeft: state.data?.depth
      ? `${15 * (state.data?.depth + 1)}px`
      : '12px',
    position: 'relative',

    ':before': {
      borderRadius: '0 0 0 4px',
      border: '2px solid #c0c0c0',
      borderTop: 'none',
      borderRight: 'none',
      content: '" "',
      display: state.data?.depth ? 'block' : 'none',
      height: 12,
      width: `${13 * state.data?.depth}px`,
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)'
    }
  })
});
