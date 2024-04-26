document.addEventListener('DOMContentLoaded', function() {
  const registroForm = document.getElementById('registroForm');
  const registroAtual = document.getElementById('registroAtual');

  registroForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const entrada = document.getElementById('entrada').value;
    const saidaAlmoco = document.getElementById('saidaAlmoco').value;
    const retornoAlmoco = document.getElementById('retornoAlmoco').value;
    const saida = document.getElementById('saida').value;

    const registro = {
      entrada,
      saidaAlmoco,
      retornoAlmoco,
      saida
    };

    // Salva o registro no armazenamento local
    salvarRegistro(registro);

    // Mostra o registro atual
    mostrarRegistro(registro);

    // Cria e baixa o arquivo Excel
    criarEbaixarExcel();
  });

  function salvarRegistro(registro) {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(registro);
    localStorage.setItem('registros', JSON.stringify(registros));
  }

  function mostrarRegistro(registro) {
    registroAtual.innerHTML = `
      <h2>Último Registro:</h2>
      <p>Entrada: ${registro.entrada}</p>
      <p>Saída para o Almoço: ${registro.saidaAlmoco}</p>
      <p>Retorno do Almoço: ${registro.retornoAlmoco}</p>
      <p>Saída: ${registro.saida}</p>
    `;
  }

  function criarEbaixarExcel() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const data = registros.map(registro => [registro.entrada, registro.saidaAlmoco, registro.retornoAlmoco, registro.saida]);

    xlsxPopulate.fromBlankAsync()
      .then(workbook => {
        const sheet = workbook.sheet(0);
        sheet.cell("A1").value("Entrada");
        sheet.cell("B1").value("Saída para o Almoço");
        sheet.cell("C1").value("Retorno do Almoço");
        sheet.cell("D1").value("Saída");

        data.forEach((row, index) => {
          sheet.cell(index + 2, 1).value(row[0]);
          sheet.cell(index + 2, 2).value(row[1]);
          sheet.cell(index + 2, 3).value(row[2]);
          sheet.cell(index + 2, 4).value(row[3]);
        });

        return workbook.outputAsync();
      })
      .then(data => {
        const blob = new Blob([data], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "registro_ponto.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error("Erro ao criar o arquivo Excel:", error);
      });
  }
});


// Configure o Firebase com suas credenciais
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMÍNIO.firebaseapp.com",
  databaseURL: "https://SEU_DOMÍNIO.firebaseio.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SUA_APP_ID"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao banco de dados em tempo real do Firebase
const database = firebase.database();

