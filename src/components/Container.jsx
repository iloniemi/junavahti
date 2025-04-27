import styled, { css } from 'styled-components';
import theme from '../theme';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  color: ${theme.colors.primary};
  background: transparent;
  padding: 4px;
  margin: 4px;
  border: solid;
  border-width: 2px;
  flex-grow: 1;

  box-shadow: 0px 0px 2px 1px, 0px 0px 2px 1px inset;
  text-shadow: 0px 0px 2px;
  ${props => props.column && css`
    flex-direction: column;
  `}
`;

export default Container;