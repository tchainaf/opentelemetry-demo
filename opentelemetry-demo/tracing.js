'use strict'

const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');

// Configurando o exportador para traces (usando OTLP via HTTP)
const traceExporter = new OTLPTraceExporter({
  url: 'http://https://probable-space-guide-4gj947r96ppcvp7-4317.app.github.dev:4317/v1/traces', // Endereço do OTLP Collector
});

// Configurando o exportador para métricas (usando OTLP via HTTP)
const metricExporter = new OTLPMetricExporter({
  url: 'http://https://probable-space-guide-4gj947r96ppcvp7-4317.app.github.dev:4317/v1/metrics', // Endereço do OTLP Collector
});

// configurar SDK para exportar dados de telemetria no console
// habilitar auto-instrumentations
const traceExporterConsole = new ConsoleSpanExporter();
const sdk = new opentelemetry.NodeSDK({
  resource: Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
    })
  ), 
  traceExporter: traceExporter,
  metricExporter: metricExporter,
  traceExporter: traceExporterConsole,
  instrumentations: [getNodeAutoInstrumentations()]
});

// inicializar o SDK e registrar OpenTelemetry API
// habilitar a API de telemetria
sdk.start();

// encerramento processo
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});