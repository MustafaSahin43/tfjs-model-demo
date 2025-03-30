// Model URL'leri (GitHub Pages formatında)
const MODEL_URL = 'https://[KULLANICI-ADINIZ].github.io/tfjs-model-demo/tfjs_ydf_binary/model.json';

let model;

// Model yükleme
async function loadModel() {
  model = await tf.loadGraphModel(MODEL_URL);
  console.log("Model başarıyla yüklendi!");
  document.getElementById('predictBtn').disabled = false;
}

// Tahmin fonksiyonu
async function predict() {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  
  // Giriş tensörünü oluştur (modelin beklediği formatta)
  const inputTensor = tf.tensor2d([[num1, num2]]);
  
  // Tahmin yap
  const prediction = await model.predict(inputTensor);
  const score = prediction.dataSync()[0];
  const result = score > 0.5 ? "Tür A (1)" : "Tür B (0)";
  
  // Sonucu göster
  document.getElementById('result').innerHTML = `
    <h3>Sonuç: ${result}</h3>
    <p>Güven skoru: ${score.toFixed(4)}</p>
    <small>Model: YDF Random Forest</small>
  `;
  
  // Belleği temizle
  inputTensor.dispose();
}

// Sayfa yüklendiğinde
window.onload = () => {
  document.getElementById('predictBtn').addEventListener('click', predict);
  loadModel();
};