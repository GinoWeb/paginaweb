const correctAnswers = { q1: "b", q2: "b", q3: "c" };
let userScores = [];

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0;
  userScores = [];

  for (let q in correctAnswers) {
    const userAnswer = document.querySelector(`input[name="${q}"]:checked`);
    if (userAnswer && userAnswer.value === correctAnswers[q]) {
      score++;
      userScores.push(1);
    } else {
      userScores.push(0);
    }
  }

  document.getElementById("result").textContent = `Tu calificación: ${score} de ${Object.keys(correctAnswers).length}`;
  drawChart(userScores);
});

function drawChart(data) {
  const ctx = document.getElementById("scoreChart").getContext("2d");
  if (window.scoreChart) window.scoreChart.destroy();

  window.scoreChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Pregunta 1", "Pregunta 2", "Pregunta 3"],
      datasets: [{
        label: "Puntos",
        data: data,
        backgroundColor: data.map(score => score === 1 ? "#4caf50" : "#f44336")
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 1
        }
      }
    }
  });
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const scoreTotal = userScores.reduce((a, b) => a + b, 0);
  
    pdf.text("Resultados del Diagnóstico Porsche", 10, 10);
    userScores.forEach((val, i) => {
      pdf.text(`Pregunta ${i + 1}: ${val === 1 ? "Correcta" : "Incorrecta"}`, 10, 20 + i * 10);
    });
    pdf.text(`Puntaje Total: ${scoreTotal} / ${userScores.length}`, 10, 60);
  
    // Convertir a blob y mostrar en iframe
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    const iframe = document.getElementById("pdfViewer");
    iframe.src = url;
    iframe.style.display = "block";
  
    // Descargar el PDF
    pdf.save("diagnostico-porsche.pdf");
  }
  
