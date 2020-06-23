const form = document.querySelector('form');
const button = document.querySelector('button');

if(form)
  form.addEventListener('submit', getAPI);

function atualizarBotao(condicao){
  if(condicao)
    button.innerText = 'Pesquisando...';
  else
    button.innerText = 'Enviar';
}

async function getAPI(event){
  event.preventDefault();

  atualizarBotao(true);

  const nomePais = document.querySelector('#nomePais');

  const chamada0 = await fetch(`https://restcountries.eu/rest/v2/name/${nomePais.value}`, { method: 'GET' });
    
  const dados0 = await chamada0.json();
    
  console.log(dados0[0]);
    
  document.querySelector('#logo').setAttribute('src', dados0[0].flag);

  const chamada1 = await fetch(`https://api.covid19api.com/live/country/${nomePais.value}`, { method: 'GET' });

  const dados1 = await chamada1.json();
  const tam = dados1.length - 1;

  console.log(dados1[tam]);

  const valores = document.querySelectorAll('#dados');

  valores[0].innerHTML = dados1[tam].Confirmed;
  valores[1].innerHTML = dados1[tam].Deaths;
  valores[2].innerHTML = dados1[tam].Recovered;

  const chamada2 = await fetch('https://api.covid19api.com/stats', { method: 'GET' });

  const dados2 = await chamada2.json();

  console.log(dados2);

  const atualizacao = document.querySelector('#atualizacao');

  atualizacao.innerHTML = new Date(dados2.AllUpdated).toLocaleString();

  atualizarBotao(false);
}
