const tabButtons = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.content');

const fpsSlider = document.getElementById('fpsSlider');
const brightnessSlider = document.getElementById('brightnessSlider');
const touchSlider = document.getElementById('touchSlider');

const fpsValue = document.getElementById('fpsValue');
const latencyValue = document.getElementById('latencyValue');
const tempValue = document.getElementById('tempValue');
const batteryValue = document.getElementById('batteryValue');
const fpsLabel = document.getElementById('fpsLabel');
const brightLabel = document.getElementById('brightLabel');
const touchLabel = document.getElementById('touchLabel');

function mapTouch(value) {
  const labels = ['LOW', 'BAL', 'MED', 'HIGH', 'ALT'];
  return labels[value - 1] || 'MED';
}

function updateVisualStats() {
  const fps = Number(fpsSlider.value);
  const brightness = Number(brightnessSlider.value);
  const touch = Number(touchSlider.value);

  fpsValue.textContent = String(fps);
  latencyValue.textContent = String(Math.max(15, Math.round(60 - fps / 3)));
  tempValue.textContent = `${Math.max(34, Math.min(51, 39 + Math.round(fps / 20)))}°`;
  batteryValue.textContent = `${Math.max(48, 100 - Math.round(brightness * 0.18))}%`;

  fpsLabel.textContent = `${fps} FPS`;
  brightLabel.textContent = `${brightness}%`;
  touchLabel.textContent = mapTouch(touch);
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabButtons.forEach((tab) => tab.classList.toggle('active', tab === button));
    sections.forEach((section) => {
      section.classList.toggle('active', section.id === button.dataset.tab);
    });
  });
});

fpsSlider.addEventListener('input', updateVisualStats);
brightnessSlider.addEventListener('input', updateVisualStats);
touchSlider.addEventListener('input', updateVisualStats);

updateVisualStats();
