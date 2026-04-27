// Simple loader for Chart.js (for demo, in real app use Angular wrapper)
export function loadChartJs(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).Chart) return resolve();
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}
