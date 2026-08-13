---
title: "Facility: Idle Megawatts"
---
El operador ve medidores de consumo eléctrico marcando 40% de capacidad utilizada en horas pico, pero el PUE (Power Usage Effectiveness) indica que el 60% restante se pierde en transformación y refrigeración ineficiente. Los pasillos fríos operan 4°C por debajo de los requisitos del SLA a pesar de que la utilización real de servidores es baja. Las CRAC (Computer Room Air Conditioning units) funcionan a régimen completo durante la madrugada, cuando la carga térmica real es una fracción de la capacidad de diseño.

El costo de esta ineficiencia se estima en $2.4M anuales por cada megawatt desperdiciado. De ese total, el 50% ($1.20M) corresponde a energía de cooling sin carga útil, el 30% ($0.72M) a sobredimensionamiento de UPS y PDUs, y el 20% restante ($0.48M) a mantenimiento de refrigeración sobredimensionada.

La causa raíz es un diseño de cooling sobredimensionado, construido sobre proyecciones de densidad que nunca se materializaron. A eso se suma la ausencia de monitoreo granular: los sensores de temperatura operan con setpoints estáticos, ciegos a la telemetría real de los workloads, y los loops de refrigeración no tienen feedback con la capa de orquestación de cargas.

Las métricas lo confirman: un PUE típico de 1.8–2.2 frente a un rango eficiente de 1.2–1.4; CRAC funcionando al 85–100% cuando bastaría un 40–60%; y una carga real de UPS de apenas 30–40% frente al 65–80% que soportaría un diseño ajustado a la demanda real. En conjunto, la capacidad eléctrica provisionada se utiliza solo en un 40%.
