import styled from 'styled-components'

//TODO: 반응형 추가 후 수치들 theme로 조정
const Text = styled.p`
  text-align: ${props => props.align || "justify"};
  font-size: ${props => props.size || "16px"};
  font-family: ${({ theme }) => theme.font.light};
  color: ${({ theme }) => theme.color.text};
`

export default Text