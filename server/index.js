const WebSocket = require('ws');

/**
 * ip e porta que será iniciado o servidor:
 */
const ip = '26.183.229.122';
const port = 10000;

/**
 * variaveis que irão guardar os pacientes e as interfaces(médicos) atuais:
 */
var pacientes = [];
var interface = [];

/**
 * inicia o servidor:
 */
const serve = new WebSocket.Server({
  port: port,
  host: ip,
});

/**
 * Método de lista de evento.
 *
 * Quando o servidor recebe uma nova conexão (primeiro parâmetro), a função callback passada como
 * segundo parâmetro é executada.
 *
 */
serve.on('connection', (client) => {
  console.log('Cliente conectado...');
  if (client.protocol === 'medico') {
    // Caso o cliente for um médico, é adicionado na lista de interfaces
    // e os pacientes atuais são enviados.
    console.log('Médico');
    interface.push(client);
    client.send(JSON.stringify({ pacientes: pacientes }));
    console.log('Pacientes atuais: ', pacientes);
  }

  // Adiciona o cliente recém conectado à uma lista de eventos de mensagem.
  // Toda vez q esse cliente enviar uma mensagem, o servidor executa a função passada como segundo
  // parâmetro.
  client.on('message', (data) => {
    try {
      // Faz a conversão da mensagem recebida para Json.
      let message = JSON.parse(data.toString());
      if (message.paciente) {
        // Caso a mensagem contenha um paciente, esse paciente é
        // adicionado ou atualizado na lista atual
        let contain = false;
        message.paciente.situacao = situation(message.paciente);
        pacientes.map((paciente, index) => {
          if (message.paciente.id === paciente.id) {
            pacientes[index] = message.paciente;
            contain = true;
          }
        });
        if (!contain) {
          pacientes.push(message.paciente);
        }

        pacientes = orderBy();
        console.log(pacientes);
        client.send(JSON.stringify({ paciente: message.paciente }));
        if (interface.length > 0) {
          interface.map((interface, index) => {
            interface.send(JSON.stringify({ pacientes: pacientes }));
          });
        }
      } else if (message.id) {
        // caso a mensagem contenha um id, será buscado um paciente com esse id, ou,
        // caso não exista um paciente com esse id, será criado um novo paciente.
        console.log('id recebido');
        let contains = false;

        pacientes.map((paciente, index) => {
          if (paciente.id === message.id) {
            client.send(JSON.stringify({ paciente: paciente }));
            contains = true;
          }
        });
        console.log(contains);
        if (!contains) {
          let paciente = {
            id: message.id,
            nome: `paciente ${message.id}`,
            freq_card: 0,
            freq_resp: 0,
            pressao: 0,
            temperatura: 0,
            oxigenacao: 0,
            situacao: 'NULO',
          };
          paciente.situacao = situation(paciente);
          console.log(paciente);
          pacientes.push(paciente);
          pacientes = orderBy();
          client.send(JSON.stringify({ paciente: paciente }));
          if (interface.length > 0) {
            interface.map((interface, index) => {
              interface.send(JSON.stringify({ pacientes: pacientes }));
            });
          }
          console.log('paciente criado e enviado.');
        }
      } else {
        client.send(`{"message":"expected data in request"}`);
      }
    } catch (e) {
      client.send(`{"message":"${e.message}"}`);
    }
  });

  // Adiciona o cliente recém conctado à uma lista de eventos de "fechamento"
  // Toda vez que um cliente desconectar, o servidor é avisado e varre a lista de
  // interfaces à procura de um cliente com o status de desconctado para excluí-lo.
  client.on('close', () => {
    console.log('Cliente desconectado');
    interface.map((value, index) => {
      if (value.readyState >= 2) {
        interface.splice(index, 1);
      }
    });
  });
});

/**
 * Função que faz o controle da situação dos pacientes que são atualizados e adicionados
 *
 * @param {*} paciente paciente que será categorizado.
 * @returns a situação do paciente atual.
 */
function situation({ freq_card, freq_resp, pressao, temperatura, oxigenacao }) {
  let pontuacao = 0;
  if (parseInt(freq_card) >= 50 && parseInt(freq_card) <= 100) {
    pontuacao = pontuacao + 0;
  } else if (parseInt(freq_card) > 100 && parseInt(freq_card) < 111) {
    pontuacao++;
  } else if (parseInt(freq_card) >= 111 && parseInt(freq_card) < 150) {
    pontuacao = pontuacao + 3;
  } else {
    pontuacao = pontuacao + 5;
  }

  if (parseInt(freq_resp) >= 13 && parseInt(freq_resp) <= 20) {
    pontuacao = pontuacao + 0;
  } else if (
    (parseInt(freq_resp) > 20 && parseInt(freq_resp) < 30) ||
    (parseInt(freq_resp) < 13 && parseInt(freq_resp) >= 10)
  ) {
    pontuacao++;
  } else if (parseInt(freq_resp) >= 30 && parseInt(freq_resp) <= 40) {
    pontuacao = pontuacao + 3;
  } else {
    pontuacao = pontuacao + 5;
  }

  if (parseInt(pressao) >= 100 && parseInt(pressao) <= 120) {
    pontuacao = pontuacao + 0;
  } else if (
    (parseInt(pressao) > 81 && parseInt(pressao) < 100) ||
    (parseInt(pressao) < 130 && parseInt(pressao) >= 120)
  ) {
    pontuacao++;
  } else if (
    (parseInt(pressao) >= 70 && parseInt(pressao) <= 81) ||
    (parseInt(pressao) < 140 && parseInt(pressao) >= 130)
  ) {
    pontuacao = pontuacao + 3;
  } else {
    pontuacao = pontuacao + 5;
  }

  if (parseInt(temperatura) >= 36 && parseInt(temperatura) <= 37) {
    pontuacao = pontuacao + 0;
  } else if (
    (parseInt(temperatura) > 37 && parseInt(temperatura) < 39) ||
    (parseInt(temperatura) < 36 && parseInt(temperatura) >= 34)
  ) {
    pontuacao = pontuacao + 3;
  } else {
    pontuacao = pontuacao + 5;
  }

  if (parseInt(oxigenacao) >= 97 && parseInt(oxigenacao) <= 100) {
    pontuacao = pontuacao + 0;
  } else if (parseInt(oxigenacao) > 92 && parseInt(oxigenacao) < 97) {
    pontuacao = pontuacao + 3;
  } else {
    pontuacao = pontuacao + 5;
  }

  let situacao;
  if (pontuacao >= 3 && pontuacao < 5) {
    situacao = 'Instável';
  } else if (pontuacao >= 5) {
    situacao = 'Grave';
  } else {
    situacao = 'Estável';
  }
  return situacao;
}

/**
 * Função que faz a ordenação da lista de pacientes, entre Grave, instável e estável
 *
 * @returns lista de pacientes ordenada
 */
function orderBy() {
  let result = [];
  pacientes.map((paciente, index) => {
    if (paciente.situacao === 'Grave') {
      result.push(paciente);
    }
  });
  pacientes.map((paciente, index) => {
    if (paciente.situacao === 'Instável') {
      result.push(paciente);
    }
  });
  pacientes.map((paciente, index) => {
    if (paciente.situacao === 'Estável') {
      result.push(paciente);
    }
  });
  return result;
}
