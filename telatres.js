const form = document.getElementById('formPaciente');
const fila = document.getElementById('fila');
const atendimentoDiv = document.getElementById('atendimento');
const gerarSenhaBtn = form.querySelector('button[type="submit"]');
const tituloPagina = document.getElementById('tituloPagina');
const tituloFila = document.getElementById('tituloFila');

const nomeInput = document.getElementById('nome');
const erroNome = document.getElementById('erroNome');
const cpfInput = document.getElementById('cpf');
const erroCpf = document.getElementById('erroCpf');
const idadeInput = document.getElementById('idade');
const sexoInput = document.getElementById('sexo');
const prioridadeInput = document.getElementById('prioridade');
const servicoInput = document.getElementById('servico');
const semCpfCheck = document.getElementById('semCpf');
const examesInput = document.getElementById('exames');
const motivoInput = document.getElementById('motivo');

const mostrarHistoricoBtn = document.getElementById('mostrarHistoricoBtn');
const historicoDiv = document.getElementById('historico');
const listaHistorico = document.getElementById('listaHistorico');

let pacientes = [];
let historico = [];
let pacienteAtual = null;

function formatarNome(nome) {
  return nome
    .toLowerCase()
    .split(' ')
    .map(p => p.length >= 3 ? p.charAt(0).toUpperCase() + p.slice(1) : p)
    .join(' ');
}

function validarNomeSobrenome(nome) {
  const partesValidas = nome.trim().split(' ').filter(p => p.length >= 3);
  return partesValidas.length >= 2;
}

function formatarCPF(cpf) {
  const numeros = cpf.replace(/\D/g, '');
  if (numeros.length !== 11) return cpf;
  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

function validarFormulario() {
  const nome = nomeInput.value.trim();
  const cpf = cpfInput.value.trim();
  const idade = parseInt(idadeInput.value, 10);
  const prioridade = prioridadeInput.value;
  const servico = servicoInput.value;
  const sexo = sexoInput.value;
  const semCpf = semCpfCheck.checked;

  cpfInput.disabled = semCpf;
  semCpfCheck.disabled = cpf !== '';

  const nomeValido = validarNomeSobrenome(nome);
  const cpfValido = cpf !== '' ? validarCPF(cpf) : semCpf;
  const idadeValida = !isNaN(idade) && idade >= 0 && idade <= 130;
  const formularioValido = nomeValido && cpfValido && prioridade && servico && idadeValida && sexo;

  erroNome.classList.toggle('hidden', nomeValido);
  erroCpf.classList.toggle('hidden', cpf === '' || validarCPF(cpf));
  gerarSenhaBtn.disabled = !formularioValido;
}

nomeInput.addEventListener('input', () => {
  nomeInput.value = formatarNome(nomeInput.value.replace(/[0-9]/g, ''));
  validarFormulario();
});

cpfInput.addEventListener('input', () => {
  cpfInput.value = formatarCPF(cpfInput.value.replace(/\D/g, ''));
  validarFormulario();
});

semCpfCheck.addEventListener('change', validarFormulario);
form.addEventListener('input', validarFormulario);

form.addEventListener('submit', e => {
  e.preventDefault();

  const nome = formatarNome(nomeInput.value);
  const cpf = semCpfCheck.checked ? 'Sem CPF' : formatarCPF(cpfInput.value);
  const idade = parseInt(idadeInput.value, 10);
  const sexo = sexoInput.value;
  const prioridade = prioridadeInput.value;
  const servico = servicoInput.value;
  const tempo = new Date();

  const novoPaciente = { nome, cpf, idade, sexo, prioridade, servico, tempo };
  pacientes.push(novoPaciente);
  atualizarFila();
  form.reset();
  gerarSenhaBtn.disabled = true;
  validarFormulario();
});

function atualizarFila() {
  fila.innerHTML = '';
  const agora = new Date();

  pacientes.forEach((paciente, index) => {
    const minutos = Math.floor((agora - paciente.tempo) / 60000);
    const li = document.createElement('li');
    li.innerHTML = `
      ${paciente.nome} (${paciente.idade} anos) - ${paciente.prioridade} - ${paciente.servico} - ${minutos} min em espera
      <div>
        <button onclick="chamarPaciente(${index})">Chamar</button>
        <button onclick="removerPaciente(${index})">Excluir</button>
      </div>`;
    fila.appendChild(li);
  });
}

function chamarPaciente(index) {
  pacienteAtual = { ...pacientes[index], chamada: new Date() };

  document.getElementById('nomePaciente').textContent = pacienteAtual.nome;
  document.getElementById('cpfPaciente').textContent = pacienteAtual.cpf;
  document.getElementById('prioridadePaciente').textContent = pacienteAtual.prioridade;
  document.getElementById('servicoPaciente').textContent = pacienteAtual.servico;

  atendimentoDiv.classList.remove('hidden');
  form.classList.add('hidden');
  tituloPagina.textContent = 'Admissão de Paciente';
  tituloFila.classList.add('hidden');
  fila.classList.add('hidden');

  pacientes.splice(index, 1);
  atualizarFila();
}

function removerPaciente(index) {
  pacientes.splice(index, 1);
  atualizarFila();
}

function finalizarAtendimento() {
  const exames = examesInput.value;
  const motivo = motivoInput.value;

  if (!exames) {
    alert('Selecione se todos os exames foram realizados.');
    return;
  }

  if (exames === 'Não' && !motivo) {
    alert('Informe o motivo da não realização.');
    return;
  }

  pacienteAtual.finalizacao = new Date();
  pacienteAtual.exames = exames;
  pacienteAtual.motivo = motivo;

  historico.push(pacienteAtual);
  pacienteAtual = null;

  atendimentoDiv.classList.add('hidden');
  form.classList.remove('hidden');
  tituloPagina.textContent = 'Admissão de Pacientes - Artrec';
  tituloFila.classList.remove('hidden');
  fila.classList.remove('hidden');
  atualizarFila();
  atualizarHistorico();
}

function cancelarAtendimento() {
  pacienteAtual = null;
  atendimentoDiv.classList.add('hidden');
  form.classList.remove('hidden');
  tituloPagina.textContent = 'Admissão de Pacientes - Artrec';
  tituloFila.classList.remove('hidden');
  fila.classList.remove('hidden');
}

function atualizarHistorico() {
  listaHistorico.innerHTML = '';

  const ordenado = [...historico].sort((a, b) => {
    const getPeso = p =>
      p.idade >= 80 ? 0 :
      p.prioridade === 'Sim' ? 1 :
      2;
    return getPeso(a) - getPeso(b);
  });

  ordenado.forEach(p => {
    const gerada = p.tempo.toLocaleTimeString();
    const chamada = p.chamada.toLocaleTimeString();
    const finalizada = p.finalizacao.toLocaleTimeString();
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${p.nome}</strong> (${p.idade} anos)<br>
      Sexo: ${p.sexo} | Serviço: ${p.servico} | Prioridade: ${p.prioridade}<br>
      Hora gerada: ${gerada} | Chamado: ${chamada} | Finalizado: ${finalizada}<br>
      Exames realizados: ${p.exames}${p.exames === 'Não' ? ` | Motivo: ${p.motivo}` : ''}
    `;
    listaHistorico.appendChild(li);
  });
}

mostrarHistoricoBtn.addEventListener('click', () => {
  historicoDiv.classList.toggle('hidden');
});
