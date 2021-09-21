import { Collapse, List, styled, Typography } from '@material-ui/core';

export const ContainerApp = styled('div')`
  display: flex;
  min-height: 100vh;
  justify-content: space-evenly;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
  }
`;

export const ContainerList = styled('div')`
  min-width: 300px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    min-width: 500px;
  }

  .MuiListItem-root {
    border-radius: 10px;
    margin: 0 0 5px 0;
  }
`;

export const ContainerFixed = styled(Collapse)`
  min-width: 300px;
  border-radius: 30px;
  padding: 10px;
  margin: 10px;
`;

export const PacientContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export const InformationPacient = styled('div')`
  padding: 15px;
  margin: 5px 5px 30px 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 1px 20px black;

  ${({ theme }) => theme.breakpoints.down('md')} {
    margin: 5px 30px 5px 5px;
    padding-right: 10px;
  }

  .MuiAvatar-root {
    background-color: white;
    color: black;
  }
`;

export const ListStyle = styled(List)`
  overflow: scroll;
  height: 550px;
  margin: 30px 0 0 0;
  padding-top: 0;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #2b1c2b;
    border-radius: 0px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #b3afb3;
  }
  ::-webkit-scrollbar-track {
    background: white;
    border-radius: 0px;
    box-shadow: inset 0px 0px 0px 0px #f0f0f0;
  }

  .MuiAvatar-root {
    background-color: white;
    color: black;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    height: 300px;
  }
`;
