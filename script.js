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
});
