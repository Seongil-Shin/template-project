import styled, { css } from 'styled-components'

/*
  props
    space
    color
*/

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 16px 0;

  border-radius: 8px;
  background: ${props => props.theme.color[props.color]};

  
`

export default Container