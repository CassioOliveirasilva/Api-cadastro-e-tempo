function limparCampos() {
document.getElementById('logradouro').value = "";
document.getElementById('bairro').value = "";
document.getElementById('cidade').value = "";
document.getElementById('uf').value = "";
}

function buscarClima() {
    const cidade = document.getElementById('cidade').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=8cc85b402a733c3c45ec84e3dd06f83e&lang=pt`)
    .then(response => response.json())
    .then(data => {
    const temperatura = (data.main.temp - 273.15).toFixed(2);
    const descricao = data.weather[0].description;
    const UTC = data.timezone;
    const offsetCidadeMS = data.timezone * 1000;
            const horaLocalMS = Date.now() + offsetCidadeMS;
            const horaLocal = new Date(horaLocalMS); 

            const formatadorDeHora = new Intl.DateTimeFormat('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'UTC' 
            });
    document.getElementById("horaLocal").textContent = `Hora local: ${formatadorDeHora.format(horaLocal)}`;
    document.getElementById('temperatura').textContent = `Temperatura: ${temperatura}°C`;    
    document.getElementById('descricao').textContent = `Descrição: ${descricao}`;
    aplicarCorTemperatura(parseFloat(temperatura));
    })
   
    .catch(error => {
    console.log('Erro:', error);
    });
}
function aplicarCorTemperatura(temp) {
    const elemento = document.getElementById('temperatura');

    if (temp < 15) {
        elemento.style.color = "blue";
    } else if (temp >= 15 && temp <= 30) {
        elemento.style.color = "green";
    } else {
        elemento.style.color = "red";
    }
}

function salvar() {
let nome = document.getElementById("nome").value;
let email = document.getElementById("email").value;
let telefone = document.getElementById("telefone").value;
let logradouro = document.getElementById('logradouro').value;
let bairro = document.getElementById('bairro').value;
let cidade = document.getElementById('cidade').value;
let uf = document.getElementById('uf').value;

let dados = { 
    nome: nome, 
    email: email, 
    telefone: telefone, 
    logradouro: logradouro, 
    bairro: bairro,
    cidade: cidade,
    uf:uf
};
localStorage.setItem("formulario", JSON.stringify(dados));
alert("Dados salvos com sucesso!");
}

function buscarEndereco() {
const cepInput = document.getElementById('cep');

const cep = cepInput.value.replace(/\D/g, '');

const url = `https://viacep.com.br/ws/${cep}/json/`;
limparCampos(); 
if (cep.length !== 8) {
alert("CEP inválido! Digite 8 números.");
return;
}

fetch(url)
.then(response => response.json())
.then(dados => { 
if (dados.erro) {

alert("CEP não encontrado na base de dados do ViaCEP.");
} else {

document.getElementById('logradouro').value = dados.logradouro;
document.getElementById('bairro').value = dados.bairro;
document.getElementById('cidade').value = dados.localidade;
buscarClima();
document.getElementById('uf').value = dados.uf;
document.getElementById('numero').focus();

}
})
.catch(error => {
console.error('Erro na requisição da API:', error);
});
 
}
