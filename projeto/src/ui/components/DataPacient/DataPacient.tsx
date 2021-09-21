import { Typography } from '@material-ui/core';
import PacienteInterface from 'data/@types/pacienteInterface';
import React from 'react';
import { DataPacientContainer } from './DataPacient.style';

interface DataPacienteProps {
  paciente: PacienteInterface;
  variant?: string;
  see: string;
  text?: string;
  box?: string;
}

const DataPacient: React.FC<DataPacienteProps> = ({
  paciente,
  variant,
  see,
  text,
  box,
}) => {
  return (
    <DataPacientContainer
      sx={
        variant === 'small'
          ? { boxShadow: 'none', display: see }
          : { boxShadow: '0 1px 10px white', display: see }
      }
    >
      <div>
        <Typography
          variant={variant === 'small' ? 'caption' : 'body1'}
          color={text}
        >
          Temperatura Corporal:
        </Typography>
        <Typography
          variant={variant === 'small' ? 'caption' : 'body1'}
          color={text}
        >
          {paciente.temperatura}°C
        </Typography>
      </div>
      <div>
        <Typography
          variant={variant === 'small' ? 'caption' : 'body1'}
          color={text}
        >
          Frequência Respiratória:
        </Typography>
        <Typography
          variant={variant === 'small' ? 'caption' : 'body1'}
          color={text}
        >
          {paciente.freq_resp}mpm
        </Typography>
      </div>
      <div>
        <Typography
          variant={variant === 'small' ? 'caption' : 'body1'}
          color={text}
        >
          Frequência Cardíaca:
        </Typography>
        <Typography
          variant={variant === 'small' ? 'caption' : 'body1'}
          color={text}
        >
          {paciente.freq_card}bpm
        </Typography>
      </div>
      <div>
        <Typography
          variant={variant === 'small' ? 'caption' : 'body1'}
          color={text}
        >
          Pressão arterial:
        </Typography>
        <Typography
          variant={variant === 'small' ? 'caption' : 'body1'}
          color={text}
        >
          {paciente.pressao}mm Hg
        </Typography>
      </div>
      <div>
        <Typography
          variant={variant === 'small' ? 'caption' : 'body1'}
          color={text}
        >
          Oxigenação:
        </Typography>
        <Typography
          variant={variant === 'small' ? 'caption' : 'body1'}
          color={text}
        >
          {paciente.oxigenacao}%
        </Typography>
      </div>
    </DataPacientContainer>
  );
};

export default DataPacient;
