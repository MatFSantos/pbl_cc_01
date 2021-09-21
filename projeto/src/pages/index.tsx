import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Tooltip,
  Collapse,
  Button,
  CircularProgress,
} from '@material-ui/core';
import {
  CheckCircleOutline,
  CheckCircle,
  Face,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from '@material-ui/icons';
import UseIndex from 'data/hooks/pages/useIndex';
import React, { useEffect } from 'react';
import {
  ContainerList,
  ContainerFixed,
  InformationPacient,
  ContainerApp,
  ListStyle,
} from 'ui/styles/pages/index.style';
import DataPacient from 'ui/components/DataPacient/DataPacient';

export default function Home() {
  const {
    pined,
    pacientes,
    onClick,
    more,
    seeMore,
    bool,
    connection,
    erro,
    loading,
  } = UseIndex();

  useEffect(() => {
    connection();
  }, []);
  return (
    <ContainerApp>
      <ContainerFixed
        in={bool}
        sx={
          pined
            ? pined.situacao === 'Grave'
              ? { backgroundColor: '#ff0000b2' }
              : pined.situacao === 'Instável'
              ? { backgroundColor: '#ff9100c1' }
              : { backgroundColor: '#008a0090' }
            : { backgroundColor: 'white' }
        }
        timeout={500}
      >
        {pined ? (
          <>
            <InformationPacient>
              <Avatar>
                <Face />
              </Avatar>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat',
                }}
              >
                {pined.nome}
              </Typography>
              <Typography sx={{ color: 'white', fontFamily: 'Montserrat' }}>
                {pined.situacao}
              </Typography>
            </InformationPacient>
            <DataPacient
              paciente={pined}
              variant={'small'}
              see={'inline'}
              text={'white'}
              box={'1px 0 10px black'}
            />
          </>
        ) : (
          ''
        )}
      </ContainerFixed>
      <ContainerList>
        <Typography
          variant={'h3'}
          sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}
        >
          Lista de Pacientes
        </Typography>
        {erro ? (
          <>
            <Typography color={'error'}>{erro}</Typography>
            <Button
              sx={{
                margin: '5px 50px 10px 50px',
                maxHeight: '36px',
              }}
              variant={'contained'}
              onClick={() => connection()}
              disabled={loading}
            >
              {loading ? <CircularProgress /> : ''}reconectar
            </Button>
          </>
        ) : (
          ''
        )}
        <ListStyle>
          {pacientes.length > 0 ? (
            pacientes.map((paciente, index) => (
              <ListItem
                key={index}
                sx={
                  paciente.situacao === 'Grave'
                    ? { backgroundColor: '#ff0000b2' }
                    : paciente.situacao === 'Instável'
                    ? { backgroundColor: '#ff9100c1' }
                    : { backgroundColor: '#008a0090' }
                }
              >
                <Tooltip title={paciente.nome}>
                  <ListItemAvatar>
                    <Avatar>
                      <Face />
                    </Avatar>
                  </ListItemAvatar>
                </Tooltip>
                <ListItemText
                  primary={paciente.nome}
                  secondary={
                    <Tooltip
                      title={more === index.toString() ? 'Menos' : 'Mais'}
                    >
                      <IconButton
                        onClick={() => seeMore(index)}
                        sx={{ color: 'black' }}
                      >
                        {more === index.toString() ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </IconButton>
                    </Tooltip>
                  }
                  primaryTypographyProps={{
                    color: 'white',
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                  }}
                />
                <Collapse in={more === index.toString()} timeout={500}>
                  <DataPacient
                    paciente={paciente}
                    variant={'small'}
                    see={more === index.toString() ? 'inline' : 'none'}
                    text={'white'}
                  />
                </Collapse>
                <Typography color={'white'} fontFamily={'Montserrat'}>
                  {paciente.situacao}
                </Typography>
                <ListItemSecondaryAction>
                  <Tooltip title={pined === paciente ? 'Desfixar' : 'Fixar'}>
                    <IconButton
                      edge="end"
                      aria-label={pined === paciente ? 'Desfixar' : 'Fixar'}
                      onClick={() => onClick(index)}
                      sx={{ color: 'black' }}
                    >
                      {pined === paciente ? (
                        <CheckCircle />
                      ) : (
                        <CheckCircleOutline />
                      )}
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography>Nenhum paciente cadastrado</Typography>
          )}
        </ListStyle>
      </ContainerList>
    </ContainerApp>
  );
}
