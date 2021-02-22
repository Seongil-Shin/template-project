import styled, { css } from 'styled-components'

/*
  props
    align
    color
    border
*/

//TODO: 반응형 추가 후 수치들 theme로 조정
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => {
    if (props.align === 'left')
      return 'flex-start'
    else if (props.align === 'right')
      return 'flex-end'
    return props.align || 'center'
  }};

  margin: 0 16px;
  margin-top: 0;
  padding: 32px 24px;

  background: ${props => props.color || 'none'};
  ${props => props.border &&
    css`
      border: 1px solid ${props => props.theme.color[props.border]};
    `}
  border-radius: 8px;

  & > *:not(:last-child) {
    margin-bottom: ${props => props.mb || "16px"};
  }
`

export default Card