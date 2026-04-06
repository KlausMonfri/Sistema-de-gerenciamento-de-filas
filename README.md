Sistema de Gerenciamento de Filas

Descrição
Este projeto consiste no desenvolvimento de um sistema web para gerenciamento de filas de atendimento, voltado para ambientes como clínicas, laboratórios e postos de saúde.
O sistema tem como objetivo otimizar o fluxo de atendimento, organizar a ordem de chegada dos pacientes e reduzir o tempo de espera.

A aplicação foi construída utilizando tecnologias web, priorizando simplicidade, usabilidade e eficiência.

Funcionalidades
-Cadastro de pacientes com ou sem CPF
-Capitalização automática de nomes
-Controle da fila de atendimento
-Registro do tempo de espera
-Chamada de pacientes para atendimento
-Histórico completo de atendimentos
-Validações condicionais durante o fluxo
-Controle de visibilidade durante atendimento ativo

Tecnologias Utilizadas:
HTML5
CSS3
JavaScript
Firebase (opcional, dependendo da implementação)

Funcionamento do Sistema

O sistema simula um fluxo real de atendimento:
-O paciente é cadastrado na fila
-A fila é organizada automaticamente
-O tempo de espera é registrado
-Ao chamar um paciente:
-Os demais são ocultados temporariamente
-O atendimento é iniciado
-Ao finalizar:
-O atendimento é registrado no histórico

Estrutura do Projeto
/projeto
 ├── index.html
 ├── teladois.css
 ├── telatres.js
 └── documentacao.docx
 
Como Executar
Clone o repositório:
-git clone https://github.com/seu-usuario/seu-repositorio.git
Acesse a pasta do projeto
Abra o arquivo index.html em um navegador web

Resultados

Os testes realizados demonstraram que o sistema atende aos objetivos propostos, proporcionando:
-Melhor organização do fluxo de atendimento
-Redução no tempo médio de espera
-Facilidade de uso
-Controle eficiente do histórico de atendimentos

Objetivo

Desenvolver uma solução funcional e intuitiva para gerenciamento de filas, com foco em organização, eficiência e controle de atendimentos.

Trabalhos Futuros
-Integração com banco de dados em nuvem
-Implementação de autenticação de usuários
-Geração de relatórios gerenciais
-Melhoria da interface do usuário (UI/UX)
-Adaptação para dispositivos móveis

Autores
-Arthur Chonkiw
-Alex Araujo
-Guilherme Policarpo
-Klaus Monfrinatti
-José Antonio

Referências
-PRESSMAN, Roger S. Engenharia de Software
-SOMMERVILLE, Ian. Engenharia de Software
-MDN Web Docs
-W3C – HTML5
