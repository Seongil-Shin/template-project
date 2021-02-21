import styled from 'styled-components'

/*
  props
    align: text-align
    mb: margin-bottom
*/

//TODO: 반응형 추가 후 수치들 theme로 조정
const Textarea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => {
    if (props.align === 'right')
      return 'flex-end'
    return props.align || 'flex-start'
  }};

  & > *:first-child {
    margin-bottom: ${props => props.mb || "16px"};
  }
`

export default Textarea