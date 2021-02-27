import styled from 'styled-components'

/*
  props
    color
*/

//TODO: 반응형 추가 후 수치들 theme로 조정
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 1200px;
  margin: 0 auto;
  padding: 0;

  background: ${({ theme }) => theme.color.white};
  border-radius: 32px;

  & > * {
    margin: 64px;
  }
`

export default Wrapper