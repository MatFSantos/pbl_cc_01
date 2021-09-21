# Informações de instalação e uso

Esse *READ ME* informa o que deve ser usado e como deve ser usado para quê a aplicação funcione.

### Dependências do projeto

O projeto foi construído com ***Javascript***, utilizando o ***Node.js***, *software* que permite execução de códigos ***Javascript*** fora do *browser* (navegador web). Logo, para que seja possível rodar o projeto em sua máquina é imprescindível que seja instalado o ***Node.js*** na versão 14.17.6 (versão utilizada) em sua máquina.

Após a instalação você poderá utilizar o gerenciador de pacotes do ***Node.js***, o *npm*.

Assim, execute o comando:  ``npm i`` na pasta ``projeto``. Esse comando irá instalar todas as dependências do projeto.

### Rodando o projeto

Após todas as dependências instaladas o projeto está pronto para ser iniciado.

Para isso, execute o arquivo ``index.js`` presente na pasta ``projeto\server`` com o seguinte comando: ``node index.js`` 

Após isso, na pasta ``projeto``  execute o comando ``npm run build`` para montar as interfaces, feito com ``Next.js`` e ``react.js``. Após isso, execute ``npm run start``, para iniciar o servidor. Por fim, é só abrir o ``frontend`` no seu browser,  no endereço local, na porta 3000 (porta padrão).

A página principal diz respeito à interface do médico.

Para acessar a interface do paciente, entre na *url* ``/paciente``.