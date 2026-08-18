---
<<<<<<< HEAD
title: "Modelo de descomposición en tres capas"
---

Medimos capacidad varada capa por capa porque cada una responde a un ciclo de decisión distinto: la instalación se planifica en años, la infraestructura de TI en meses, y las cargas de trabajo en días. Cruzar sus métricas por separado es lo que permite ver dónde se pierde valor.
=======
title: "Metodología: Stranded Capacity Index"
---

El **Stranded Capacity Index (SCI)** proporciona un marco cuantitativo estandarizado para evaluar la capacidad no utilizada e ineficiencias operativas en la infraestructura de data centers, abarcando desde la capa física hasta la orquestación de cargas de trabajo.

### Recolección de Datos

La metodología integra telemetría continua e indicadores en tiempo real distribuidos en tres niveles estructurales:

* **Capa Facility:** Monitoreo de consumo energético efectivo (PUE), capacidad de enfriamiento reservada vs. utilizada y carga real en sistemas UPS.
* **Capa IT:** Análisis del hardware aprovisionado, tasa de inactividad de procesadores (*Dark Silicon*) y ancho de banda de red no aprovechado.
* **Capa Workload:** Evaluación de asignación de memoria, hilos de ejecución y virtualización ineficiente (*Ghost Work*).

### Cálculo del Índice

Para calcular el porcentaje final de capacidad varada, se aplica una ponderación estandarizada sobre las métricas recolectadas:

$$SCI = \left( \frac{C_{\text{física}} + C_{\text{hardware}} + C_{\text{software}}}{C_{\text{total instalada}}} \right) \times 100$$

> **Nota:** Un valor de SCI elevado indica que una fracción considerable de la inversión energética e infraestructura no está generando rendimiento computacional directo.
>>>>>>> e119395 (feat: add methodology content and SCI index structure)
