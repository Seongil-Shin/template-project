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
  & > *:not(:last-child) {
    margin-bottom: ${props => props.space || "32px"};
  }

  background: ${props => props.color || 'none'};
  
`

export default Container