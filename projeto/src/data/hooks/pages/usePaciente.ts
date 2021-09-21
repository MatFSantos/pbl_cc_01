import PacienteInterface from 'data/@types/pacienteInterface';
import { useMemo, useState } from 'react';

export default function usePaciente() {
  const [server, setServer] = useState<WebSocket>(),
    [paciente, setPaciente] = useState<PacienteInterface>(),
    [erro, setErro] = useState(''),
    [id, setId] = useState(''),
    [carregando, setCarregando] = useState(false),
    [temp, setTemp] = useState(''),
    [freq_card, setFreq_card] = useState(''),
    [freq_resp, setFreq_resp] = useState(''),
    [pressao, setPressao] = useState(''),
    [oxigenacao, setOxigenacao] = useState('');

  function getPaciente(id: string) {
    if (server) {
      server.send(JSON.stringify({ id: id }));
      setCarregando(true);
    } else {
      setErro('Servidor desconectado');
    }
  }

  function connection() {
    setPaciente(null);
    setCarregando(true);
    const conn = new WebSocket('ws://26.183.229.122:10000', 'paciente');

    conn.addEventListener('open', (server) => {
      console.log('conectado');
      setErro('');
      setServer(conn);
      setCarregando(false);
    });

    conn.onmessage = ({ data }) => {
      let receive = JSON.parse(data);
      let paciente = receive.paciente as PacienteInterface;
      console.log(paciente);
      setPaciente(paciente);
      setTemp(paciente.temperatura.toString());
      setFreq_card(paciente.freq_card.toString());
      setFreq_resp(paciente.freq_resp.toString());
      setOxigenacao(paciente.oxigenacao.toString());
      setPressao(paciente.pressao.toString());
      setCarregando(false);
    };
    conn.onclose = () => {
      setCarregando(false);
      console.log('Desconectado');
      setServer(null);
      setPaciente(null);
      setErro('servidor desconectado');
    };
  }

  function setData(
    freq_card: string,
    freq_resp: string,
    pressao: string,
    temperatura: string,
    oxigenacao: string
  ) {
    let data = {
      nome: paciente.nome,
      id: paciente.id,
      freq_card: freq_card,
      freq_resp: freq_resp,
      pressao: pressao,
      temperatura: temperatura,
      oxigenacao: oxigenacao,
      situacao: 'NULO',
    };
    if (server) {
      server.send(JSON.stringify({ paciente: data }));
    } else {
      setErro('erro');
    }
  }
  return {
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
  };
}
