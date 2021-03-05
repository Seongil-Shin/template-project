import styled from 'styled-components'

/*
  props
    mb: margin-bottom
*/

//TODO: 반응형 추가 후 수치들 theme로 조정
const Textarea = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  & > *:not(:last-child) {
    margin-bottom: ${props => props.mb || "16px"};
  }
`

export default Textarea