import styled from 'styled-components'

/*
  props
    align: text-align
    size: font-size
      desc: 20px
      card: 16px
      default: 16px
    font: font-family
    color
*/

//TODO: 반응형 추가 후 수치들 theme로 조정
//TODO: Card에선 16px, Title/Desc 조합일 때는 20px
const Text = styled.p`
  text-align: ${props => props.align || "justify"};
  font-size: ${props => {
      if (props.size === 'desc')
        return '20px'
      else if (props.size === 'card')
        return '16px'
      return props.size || "16px"
    }
  };
  font-family: ${({ theme }) => theme.font.light};
  color: ${({ theme }) => theme.color.text};
`

export default Text