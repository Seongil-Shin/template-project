import styled, { css } from 'styled-components'

/*
  props
    align
    color
    width
*/

//TODO: 반응형 추가 후 수치들 theme로 조정
const Cards = styled.div`
  display: flex;
  justify-content: ${props => {
    if (props.align === 'left')
      return 'flex-start'
    else if (props.align === 'right')
      return 'flex-end'
    else if (props.align === 'center')
      return 'center'
    return props.align || 'space-between'
  }};

  width: 100%;
  padding: 16px 0;
  border-radius: 8px;

  background: ${props => props.theme.color[props.color]};
`

export default Cards