import PacienteInterface from 'data/@types/pacienteInterface';
import { useMemo, useState } from 'react';

export default function UseIndex() {
  const [pacientes, setPacientes] = useState<PacienteInterface[]>([]),
    [pined, setPined] = useState<PacienteInterface>(null),
    [more, setMore] = useState(''),
    [bool, setBool] = useState(false),
    [erro, setErro] = useState(''),
    [server, setServer] = useState<WebSocket>(null),
    [loading, setLoading] = useState(false);

  function seeMore(index: number) {
    if (more === index.toString()) {
      setMore('');
    } else {
      setMore(index.toString());
    }
  }

  function onClick(index: number) {
    if (pined === pacientes[index]) {
      setBool(false);
      setTimeout(() => {
        setPined(null);
      }, 200);
    } else {
      if (pined === null) {
        setPined(pacientes[index]);
        setBool(true);
      } else {
        setBool(false);
        setTimeout(() => {
          setPined(pacientes[index]);
          setBool(true);
        }, 500);
      }
    }
    if (server) {
      server.onmessage = ({ data }) => {
        let message = JSON.parse(data);
        if (pacientes[index] != null) {
          let contains = false;
          message.pacientes.map((value) => {
            if (pacientes[index].id.toString() === value.id) {
              setPined(value);
              contains = true;
            }
          });
          if (!contains) {
            setPined(null);
          }
        } else {
          setPined(null);
        }

        setPacientes(message.pacientes);
      };
    }
  }

  function connection() {
    setLoading(true);
    const conn = new WebSocket('ws://26.183.229.122:10000', 'medico');

    conn.addEventListener('open', (serve) => {
      console.log('conectado');
      setServer(conn);
      setErro('');
      setLoading(false);
    });

    conn.onmessage = ({ data }) => {
      let { pacientes } = JSON.parse(data);

      console.log(pacientes);
      setBool(false);
      setTimeout(() => {
        setPined(pacientes[0]);
        setBool(true);
      }, 500);
      setPacientes(pacientes);
    };

    conn.onclose = () => {
      console.log('desconectado');
      setLoading(false);
      setErro('Servidor desconectado');
      setServer(null);
    };
  }

  return {
    pined,
    pacientes,
    onClick,
    more,
    seeMore,
    bool,
    connection,
    erro,
    loading,
  };
}
