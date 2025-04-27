import styled, { css } from 'styled-components';
import theme from '../theme';

const Button = styled.div`
  color: ${theme.colors.primary};
  background: transparent;
  padding: 4px;
  margin: 4px;
  border: solid;
  border-width: 2px;
  height: min-content;

  box-shadow: 0px 0px 2px 1px, 0px 0px 2px 1px inset;
  text-shadow: 0px 0px 2px;

  cursor: pointer;
  &:hover {
    color: ${theme.colors.secondary};
    box-shadow: 0px 0px 2px 1px, 0px 0px 2px 1px inset;
    text-shadow: 0px 0px 2px;
  }

  ${props => props.big && css`
    font-size: 30px;
    font-weight: bold;
  `}
`;

export default Button;