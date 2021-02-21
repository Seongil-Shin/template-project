import styled from 'styled-components'

/*
  props
    align: text-align
    size: font-size
    font: font-family
    color
*/

//TODO: 반응형 추가 후 수치들 theme로 조정
const Title = styled.h2`
  text-align: ${props => props.align || "justify"};
  font-size: ${props => props.size || "32px"};
  font-family: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.color.title};
`

export default Title