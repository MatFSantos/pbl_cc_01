import {
  Avatar,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { Face } from '@material-ui/icons';
import usePaciente from 'data/hooks/pages/usePaciente';
import React, { useEffect } from 'react';
import DataPacient from 'ui/components/DataPacient/DataPacient';
import { ContainerApp } from 'ui/styles/pages/index.style';
import { PacienteInfo } from 'ui/styles/pages/paciente.style';

export default function Paciente() {
  const {
    paciente,
    erro,
    getPaciente,
    setData,
    connection,
    id,
    setId,
    carregando,
    temp,
    setTemp,
    freq_card,
    setFreq_card,
    freq_resp,
    setFreq_resp,
    pressao,
    setPressao,
    oxigenacao,
    setOxigenacao,
    server,
  } = usePaciente();

  useEffect(() => {
    connection();
  }, []);
  return (
    <ContainerApp>
      {paciente && server ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography color={'success.main'}>Servidor conectado</Typography>
          <PacienteInfo>
            <Avatar
              sx={{
                backgroundColor: 'black',
                color: 'white',
                margin: '0 0 10px 0',
              }}
            >
              <Face />
            </Avatar>
            <div>
              <div>Nome: {paciente.nome}</div>
              <div>ID: {paciente.id}</div>
              <div>Situação: {paciente.situacao}</div>
            </div>
            <DataPacient paciente={paciente} see={'inline'} />
          </PacienteInfo>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                type={'number'}
                sx={{ margin: '10px 0 10px 0' }}
                label={'Temeperatura corporal'}
                variant={'outlined'}
                value={temp}
                onChange={(event) => setTemp(event.target.value)}
              />
              <TextField
                type={'number'}
                sx={{ margin: '10px 0 10px 0' }}
                label={'Frequência respiratória'}
                variant={'outlined'}
                value={freq_resp}
                onChange={(event) => setFreq_resp(event.target.value)}
              />
              <TextField
                type={'number'}
                sx={{ margin: '10px 0 10px 0' }}
                label={'Frequência cardíaca'}
                variant={'outlined'}
                value={freq_card}
                onChange={(event) => setFreq_card(event.target.value)}
              />
              <TextField
                type={'number'}
                sx={{ margin: '10px 0 10px 0' }}
                label={'Pressão Arterial'}
                variant={'outlined'}
                value={pressao}
                onChange={(event) => setPressao(event.target.value)}
              />
              <TextField
                type={'number'}
                sx={{ margin: '10px 0 10px 0' }}
                label={'Oxigenação'}
                variant={'outlined'}
                value={oxigenacao}
                onChange={(event) => setOxigenacao(event.target.value)}
              />
            </div>
            <div>
              <Button
                variant={'contained'}
                sx={{ margin: '10px 50px 0 50px' }}
                onClick={() =>
                  setData(freq_card, freq_resp, pressao, temp, oxigenacao)
                }
                disabled={
                  carregando ||
                  temp === '' ||
                  freq_card === '' ||
                  freq_card === '' ||
                  pressao === '' ||
                  oxigenacao === ''
                }
              >
                {carregando ? <CircularProgress /> : ''}alterar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography color={'info.dark'} sx={{ margin: '0 0 10px 0' }}>
            Insira o id do paciente, caso exista, ou um id aleatório para criar
            um novo:
          </Typography>
          {erro ? (
            <>
              <Typography color={'error'} sx={{ margin: '0 0 0 0' }}>
                {erro}
              </Typography>
              <Button
                sx={{
                  margin: '5px 50px 10px 50px',
                  maxHeight: '36px',
                }}
                variant={'contained'}
                onClick={() => connection()}
                disabled={carregando}
              >
                {carregando ? (
                  <CircularProgress
                    sx={{ maxHeight: '30px', maxWidth: '30px' }}
                  />
                ) : (
                  ''
                )}
                reconectar
              </Button>
            </>
          ) : (
            <Typography color={'success.main'} sx={{ margin: '0 0 10px 0' }}>
              Servidor conectado
            </Typography>
          )}

          <TextField
            type={'number'}
            label={'ID do paciente'}
            variant={'outlined'}
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
          <Button
            variant={'contained'}
            sx={{ margin: '10px 50px 0 50px' }}
            onClick={() => getPaciente(id)}
            disabled={carregando || id === '' || !server}
          >
            {carregando && server ? <CircularProgress /> : ''}enviar
          </Button>
        </div>
      )}
    </ContainerApp>
  );
}
