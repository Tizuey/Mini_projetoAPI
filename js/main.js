console.log("Script carregado!");

document.getElementById('buscarCep').addEventListener('click', function() {
    console.log("Botão clicado!");
    
    const cepInput = document.getElementById('cepInput').value;
    const cep = cepInput.replace(/\D/g, '');
    console.log("CEP processado:", cep);
    
    if (cep.length !== 8) {
        alert("CEP deve ter 8 dígitos");
        return;
    }
    
    console.log("Fazendo requisição para:", `https://viacep.com.br/ws/${cep}/json/`);
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
        console.log("Status da resposta:", response.status);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Dados recebidos:", data);
        
        if (data.erro) {
            throw new Error("CEP existe mas não foi encontrado na base");
        }
        
        // Preenche os resultados
        document.querySelectorAll('#info p')[0].textContent = data.cep || 'Não informado';
        document.querySelectorAll('#info p')[1].textContent = data.logradouro || 'Não informado';
        document.querySelectorAll('#info p')[2].textContent = data.bairro || 'Não informado';
        document.querySelectorAll('#info p')[3].textContent = data.localidade || 'Não informado';
        document.querySelectorAll('#info p')[4].textContent = data.uf || 'Não informado';
        
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
        alert("Erro ao buscar CEP: " + error.message);
    });
});