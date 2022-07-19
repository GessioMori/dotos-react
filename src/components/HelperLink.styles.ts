import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const HelperLink = styled(Link)`
  margin-top: 1rem;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: start;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }

  ${(props) => css`
    color: ${props.theme.dark200};
  `}

  p {
    margin-left: 0.3rem;
  }
`
