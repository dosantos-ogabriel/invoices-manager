import { ArcElement, BarElement, CategoryScale, Chart, Colors, Legend, LinearScale, Title, Tooltip } from "chart.js";
export default defineNuxtPlugin(() => {
  Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, Colors);
});
