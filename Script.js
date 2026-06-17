// ── Estado global ──────────────────────────────────────────────
let currentStep = 1;
const totalSteps = 7;
const opts = { q4: null, q5: null, q6: null };

// Perguntas que exigem seleção obrigatória
const radioSteps = { 4: 'q4', 5: 'q5', 6: 'q6' };

// ── Sliders ────────────────────────────────────────────────────
document.getElementById('q1').addEventListener('input', function () {
  document.getElementById('q1v').textContent = parseFloat(this.value).toFixed(1) + 'h';
  atualizarAvisoJogo();
});
document.getElementById('q2').addEventListener('input', function () {
  document.getElementById('q2v').textContent = parseFloat(this.value).toFixed(1) + 'h';
});
document.getElementById('q3').addEventListener('input', function () {
  document.getElementById('q3v').textContent = parseFloat(this.value).toFixed(1) + 'h';
});
document.getElementById('q7').addEventListener('input', function () {
  document.getElementById('q7v').textContent = this.value + '/10';
});

// Mostra o aviso sempre que o jogo estiver abaixo de 1h/dia
function atualizarAvisoJogo() {
  const hJogo = parseFloat(document.getElementById('q1').value);
  document.getElementById('q1-note').classList.toggle('hidden', hJogo >= 1);
}
atualizarAvisoJogo();

// ── Seleção de opções (radio) ──────────────────────────────────
function selectOpt(grupo, elemento, valor) {
  document.querySelectorAll('#' + grupo + ' .radio-opt').forEach(function (el) {
    el.classList.remove('selected');
    el.classList.remove('erro-borda');
  });
  elemento.classList.add('selected');
  elemento.querySelector('input[type="radio"]').checked = true;
  opts[grupo] = valor;

  // Remove o aviso de erro assim que o usuário seleciona
  const card = elemento.closest('.card');
  const aviso = card.querySelector('.erro-selecao');
  if (aviso) aviso.remove();
}

// ── Validação de radio obrigatório ─────────────────────────────
function mostrarErroPergunta(step) {
  const card = document.querySelector('#step-' + step + ' .card');
  if (!card.querySelector('.erro-selecao')) {
    const aviso = document.createElement('p');
    aviso.className = 'erro-selecao';
    aviso.textContent = '⚠️ Selecione uma opção para continuar.';
    card.appendChild(aviso);
  }
  card.querySelectorAll('.radio-opt').forEach(function (el) {
    if (!el.classList.contains('selected')) el.classList.add('erro-borda');
  });
}

function esconderErroPergunta(step) {
  const card = document.querySelector('#step-' + step + ' .card');
  if (!card) return;
  const aviso = card.querySelector('.erro-selecao');
  if (aviso) aviso.remove();
  card.querySelectorAll('.radio-opt').forEach(function (el) {
    el.classList.remove('erro-borda');
  });
}

// ── Navegação entre perguntas ──────────────────────────────────
function goNext() {
  // Bloqueia se for pergunta de radio sem resposta
  if (radioSteps[currentStep] && !opts[radioSteps[currentStep]]) {
    mostrarErroPergunta(currentStep);
    return;
  }
  esconderErroPergunta(currentStep);

  if (currentStep < totalSteps) {
    document.getElementById('step-' + currentStep).classList.remove('active');
    currentStep++;
    document.getElementById('step-' + currentStep).classList.add('active');
    atualizarProgresso();
    document.getElementById('btn-back').disabled = false;

    if (currentStep === totalSteps) {
      document.getElementById('btn-next').textContent = 'Ver resultado →';
    }
  } else {
    mostrarResultado();
  }
}

function goBack() {
  if (currentStep > 1) {
    esconderErroPergunta(currentStep);
    document.getElementById('step-' + currentStep).classList.remove('active');
    currentStep--;
    document.getElementById('step-' + currentStep).classList.add('active');
    atualizarProgresso();
    document.getElementById('btn-back').disabled = currentStep === 1;
    document.getElementById('btn-next').textContent = 'Próxima →';
  }
}

function atualizarProgresso() {
  const pct = Math.round((currentStep / totalSteps) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('step-label').textContent = 'Pergunta ' + currentStep + ' de ' + totalSteps;
  document.getElementById('step-pct').textContent = pct + '%';
}

// ── Cálculo do score de risco ──────────────────────────────────
function calcularScore(hJogo, hEstudo, hSono, stress, desemp, atrapalha, social) {
  let score = 0;

  if (hJogo > 5) score += 30;
  else if (hJogo > 3) score += 15;
  else if (hJogo > 1) score += 5;

  if (hEstudo < 4.5 || hEstudo > 8) score += 25;
  else if (hEstudo < 6) score += 10;

  if (hSono < 6 || hSono > 9) score += 20;
  else if (hSono < 7) score += 10;

  if (desemp === 'ruim') score += 15;
  else if (desemp === 'regular') score += 7;

  if (atrapalha === 'sempre') score += 15;
  else if (atrapalha === 'frequente') score += 8;

  if (social === 'isolado') score += 10;
  else if (social === 'baixa') score += 5;

  if (stress >= 8) score += 10;
  else if (stress >= 6) score += 5;

  return Math.min(score, 100);
}

// ── Mostrar resultado ──────────────────────────────────────────
function mostrarResultado() {
  const hJogo   = parseFloat(document.getElementById('q1').value);
  const hEstudo = parseFloat(document.getElementById('q2').value);
  const hSono   = parseFloat(document.getElementById('q3').value);
  const stress  = parseInt(document.getElementById('q7').value);
  const desemp    = opts.q4 || 'bom';
  const atrapalha = opts.q5 || 'as_vezes';
  const social    = opts.q6 || 'media';

  const score = calcularScore(hJogo, hEstudo, hSono, stress, desemp, atrapalha, social);

  document.getElementById('quiz').style.display = 'none';
  document.getElementById('result').classList.remove('hidden');

  const badgeWrap = document.getElementById('result-badge-wrap');
  const titulo    = document.getElementById('result-title');
  const descricao = document.getElementById('result-desc');

  const jogoEhFatorDeRisco = hJogo > 3;

  if (score < 35) {
    badgeWrap.innerHTML = '<span class="result-badge badge-green">Perfil equilibrado</span>';
    if (jogoEhFatorDeRisco) {
      titulo.textContent  = 'Você tem um bom equilíbrio entre jogos e estudos!';
      descricao.textContent = 'Os dados da nossa pesquisa mostram que jogadores moderados (até 3h/dia) não apresentam queda significativa no desempenho acadêmico. Você está dentro dessa faixa segura. Continue assim — mas fique de olho no sono e no estresse.';
    } else {
      titulo.textContent  = 'Seus hábitos estão bem equilibrados!';
      descricao.textContent = 'Seus indicadores de sono, estudo, desempenho e bem-estar estão dentro de faixas saudáveis. Continue assim e mantenha essa rotina.';
    }
  } else if (score < 60) {
    badgeWrap.innerHTML = '<span class="result-badge badge-amber">⚠️ Atenção necessária</span>';
    if (jogoEhFatorDeRisco) {
      titulo.textContent  = 'Seus hábitos precisam de alguns ajustes.';
      descricao.textContent = 'Nossa análise com mais de 10.000 registros mostrou que jogadores nesse perfil começam a apresentar sinais de queda no desempenho. Pequenos ajustes agora podem fazer grande diferença no seu rendimento acadêmico.';
    } else {
      titulo.textContent  = 'Alguns hábitos merecem atenção.';
      descricao.textContent = 'Seu tempo de jogo não é o problema — o que está pesando no seu score são outros fatores, como sono, estudo, desempenho, estresse ou vida social. Veja as recomendações abaixo para focar no que realmente importa.';
    }
  } else {
    badgeWrap.innerHTML = '<span class="result-badge badge-red">🚨 Risco alto</span>';
    if (jogoEhFatorDeRisco) {
      titulo.textContent  = 'Os jogos podem estar prejudicando seu desempenho.';
      descricao.textContent = 'Com base nos dados da nossa pesquisa, seu perfil se aproxima dos jogadores com maior risco de impacto negativo. No nosso Dataset 3, jogadores nesse nível dormiam em média 4,5h/dia e tinham score de isolamento social de 6,5/10. As recomendações abaixo podem te ajudar a mudar esse cenário.';
    } else {
      titulo.textContent  = 'Outros fatores estão prejudicando seu desempenho.';
      descricao.textContent = 'Seu tempo de jogo está controlado, então ele não é a causa do seu risco. O que está pesando aqui são fatores como sono, estudo, desempenho, estresse ou isolamento social. Vale focar nesses pontos nas recomendações abaixo.';
    }
  }

  const fillEl = document.getElementById('score-fill');
  document.getElementById('score-pct').textContent = score + '%';
  fillEl.style.width = score + '%';
  if (score >= 60)      fillEl.style.background = '#dc2626';
  else if (score >= 35) fillEl.style.background = '#d97706';
  else                  fillEl.style.background = '#16a34a';

  const jogoStatus   = hJogo <= 3 ? ['ok','dentro do ideal'] : hJogo <= 5 ? ['warn','atenção'] : ['bad','excessivo'];
  const sonoStatus   = hSono < 6 ? ['bad','ruim'] : hSono < 7 ? ['warn','moderado'] : hSono <= 9 ? ['ok','adequado'] : ['bad','excessivo'];
  const estudoStatus = hEstudo < 4.5 ? ['bad','ruim'] : hEstudo < 6 ? ['warn','moderado'] : hEstudo <= 8 ? ['ok','bom'] : ['bad','exagerado'];

  document.getElementById('metrics-grid').innerHTML =
    criarMetrica('Jogo/dia',    hJogo.toFixed(1) + 'h',   jogoStatus[0],   jogoStatus[1]) +
    criarMetrica('Sono/noite',  hSono.toFixed(1) + 'h',   sonoStatus[0],   sonoStatus[1]) +
    criarMetrica('Estudo/dia',  hEstudo.toFixed(1) + 'h', estudoStatus[0], estudoStatus[1]);

  const gameNoteWrap = document.getElementById('result-game-note');
  gameNoteWrap.innerHTML = hJogo < 1
    ? '<p class="info-tip-gray">Jogar pelo menos 1h por dia não causa um impacto negativo relevante no desempenho — e pode até ajudar a reduzir o estresse.</p>'
    : '';

  const recs = [];

  if (hJogo > 5) {
    recs.push(['danger', '', 'Reduza o tempo de jogo',
      'Acima de 5h/dia, nossa análise mostra correlação de -0,55 com as notas. Tente limitar a 2-3h nos dias de semana.']);
  } else if (hJogo > 3) {
    recs.push(['warn', '', 'Monitore seu tempo de jogo',
      'Você está na faixa de atenção. Defina um horário fixo para jogar e respeite esse limite diariamente.']);
  }

  if (hSono < 6) {
    recs.push(['danger', '', 'Durma mais',
      'Seu sono de ' + hSono.toFixed(1) + 'h está abaixo das 7h mínimas recomendadas — nível considerado ruim. O sono impacta diretamente a memória e o aprendizado, independente de quanto tempo você joga.']);
  } else if (hSono < 7) {
    recs.push(['warn', '', 'Durma mais',
      'Seu sono de ' + hSono.toFixed(1) + 'h está um pouco abaixo das 7h recomendadas. Pequenos ajustes na rotina já ajudam a memória e o aprendizado.']);
  } else if (hSono > 9) {
    recs.push(['danger', '', 'Ajuste seu horário de sono',
      'Seu sono de ' + hSono.toFixed(1) + 'h está acima das 9h — dormir tanto assim não traz benefício extra e pode ser sinal de outros problemas (rotina desregulada, baixa energia). O ideal é entre 7h e 9h por noite.']);
  }

  if (hEstudo < 4.5) {
    recs.push(['danger', '', 'Aumente suas horas de estudo',
      'Seu tempo de estudo de ' + hEstudo.toFixed(1) + 'h está abaixo do ideal — nível considerado ruim. Nossa análise mostrou correlação de +0,73 entre horas de estudo e notas, um dos fatores que mais pesam no desempenho acadêmico.']);
  } else if (hEstudo < 6) {
    recs.push(['warn', '', 'Aumente suas horas de estudo',
      'Seu tempo de estudo de ' + hEstudo.toFixed(1) + 'h está um pouco abaixo da faixa ideal (6h a 8h). Aumentar um pouco pode fazer boa diferença no seu desempenho.']);
  } else if (hEstudo > 8) {
    recs.push(['danger', '', 'Reduza um pouco suas horas de estudo',
      'Seu tempo de estudo de ' + hEstudo.toFixed(1) + 'h está acima do recomendado — estudar tanto assim pode aumentar o estresse e o isolamento social sem trazer ganho extra de desempenho. O ideal é entre 6h e 8h por dia, com pausas.']);
  }

  if (social === 'isolado') {
    recs.push(['danger', '', 'Invista na vida social presencial',
      'Seu nível de isolamento social está associado a maior risco de queda no desempenho e no bem-estar. Tente incluir encontros presenciais na sua rotina.']);
  } else if (social === 'baixa') {
    recs.push(['warn', '', 'Invista na vida social presencial',
      'Sua vida social está um pouco baixa. Sair mais ajuda na saúde mental e pode refletir positivamente no desempenho acadêmico.']);
  }

  if (stress >= 8) {
    recs.push(['danger', '', 'Cuide da saúde mental',
      'Seu nível de estresse está bem alto e isso está associado a pior desempenho. Considere pausas durante o estudo, exercícios físicos, técnicas de relaxamento e, se fizer sentido, apoio profissional.']);
  } else if (stress >= 6) {
    recs.push(['warn', '', 'Cuide da saúde mental',
      'Nível de estresse alto está associado a pior desempenho. Considere pausas durante o estudo, exercícios físicos ou técnicas de relaxamento.']);
  }

  if (recs.length === 0) {
    recs.push(['ok', '', 'Continue com seus bons hábitos',
      'Seu perfil está bem equilibrado. Continue priorizando o sono, o estudo e o equilíbrio entre suas atividades.']);
  }

  document.getElementById('rec-list').innerHTML = recs.map(function (rec) {
    return criarRecomendacao(rec[0], rec[1], rec[2], rec[3]);
  }).join('');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Helpers HTML ───────────────────────────────────────────────
function criarMetrica(label, valor, status, texto) {
  return '<div class="metric-card">' +
    '<p class="metric-label">' + label + '</p>' +
    '<p class="metric-val">' + valor + '</p>' +
    '<p class="metric-status status-' + status + '">' + texto + '</p>' +
    '</div>';
}

function criarRecomendacao(tipo, icone, titulo, texto) {
  return '<div class="rec-item">' +
    '<span class="rec-icon ' + tipo + '">' + icone + '</span>' +
    '<div class="rec-text">' +
    '<strong>' + titulo + '</strong>' +
    '<span>' + texto + '</span>' +
    '</div></div>';
}

// ── Reiniciar quiz ─────────────────────────────────────────────
function restart() {
  currentStep = 1;
  opts.q4 = null;
  opts.q5 = null;
  opts.q6 = null;

  document.getElementById('result').classList.add('hidden');
  document.getElementById('quiz').style.display = 'block';

  document.querySelectorAll('.step').forEach(function (el) {
    el.classList.remove('active');
  });
  document.getElementById('step-1').classList.add('active');

  document.getElementById('progress-fill').style.width = '14%';
  document.getElementById('step-label').textContent = 'Pergunta 1 de 7';
  document.getElementById('step-pct').textContent = '14%';
  document.getElementById('btn-back').disabled = true;
  document.getElementById('btn-next').textContent = 'Próxima →';

  document.querySelectorAll('.radio-opt').forEach(function (el) {
    el.classList.remove('selected');
    el.classList.remove('erro-borda');
  });
  document.querySelectorAll('input[type="radio"]').forEach(function (el) {
    el.checked = false;
  });
  document.querySelectorAll('.erro-selecao').forEach(function (el) {
    el.remove();
  });

  document.getElementById('q1').value = 3;   document.getElementById('q1v').textContent = '3.0h';
  document.getElementById('q2').value = 4;   document.getElementById('q2v').textContent = '4.0h';
  document.getElementById('q3').value = 7;   document.getElementById('q3v').textContent = '7.0h';
  document.getElementById('q7').value = 5;   document.getElementById('q7v').textContent = '5/10';
  atualizarAvisoJogo();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}