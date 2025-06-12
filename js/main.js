document.getElementById('buscarCep').addEventListener('click', buscar);

function error(message) {
    document.getElementById('result').innerHTML = `
        <div class="error">
            <h2>${message}</h2>
        </div>
    `;
}

function buscar() {
    const cepInput = document.getElementById('cepInput').value;
    // Remove tudo que não é dígito
    const cep = cepInput.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cep.length !== 8) {
        error('CEP deve conter exatamente 8 dígitos');
        return;
    }

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível consultar o CEP');
        }
        return response.json();
    })
    .then(data => {
        if (data.erro) { // Verifica se a propriedade erro existe e é true
            error('CEP não encontrado na base de dados');
            return;
        }

        console.log('Response received:', data);
        document.getElementById('result').innerHTML = `
            <h1>O endereço do CEP</h1>
            <div id="info">
                <h3> CEP:</h3> <p>${data.cep || 'Não informado'}</p>
            </div>
            <div id="info">
                <h3> Logradouro:</h3> <p>${data.logradouro || 'Não informado'}</p>
            </div>
            <div id="info">
                <h3> Bairro:</h3> <p>${data.bairro || 'Não informado'}</p>
            </div>
            <div id="info">
                <h3> Cidade:</h3> <p>${data.localidade || 'Não informado'}</p>
            </div>
            <div id="info">
                <h3> Estado:</h3> <p>${data.uf || 'Não informado'}</p>
            </div>
        `;
    })
    .catch(err => {
        console.error('Erro na requisição:', err);
        error('Ocorreu um erro ao buscar o CEP. Por favor, tente novamente.');
    });
}