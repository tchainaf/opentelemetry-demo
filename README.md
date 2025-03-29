# OPEN TELEMETRY HANDS-ON

## Passo 1 - Criar projeto NodeJS

### 1.1 criar diretório
```
mkdir opentelemetry-demo
```

### 1.2 acessar diretório e instalar express
```
cd opentelemetry-demo && npx express-generator
```

## Passo 2 - Orquestração dos logs
### 2.1 criar arquivo `tracing.js` na raiz do projeto, arquivo está disponível no respositório

## Passo 3 - Atualizar o package.json
### 3.1 atualizar arquivo package.json, inserindo as dependências open telemetry
```
{
  "name": "opentelemetry-demo",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node -r ./tracing.js ./bin/www"
  },
  "dependencies": {
    "@opentelemetry/api": "^1.9.0",
    "@opentelemetry/auto-instrumentations-node": "^0.57.0",
    "@opentelemetry/exporter-metrics-otlp-http": "^0.200.0",
    "@opentelemetry/exporter-trace-otlp-http": "^0.200.0",
    "@opentelemetry/resources": "^1.9.0",
    "@opentelemetry/semantic-conventions": "^1.9.0",
    "@opentelemetry/sdk-node": "^0.200.0",
    "@opentelemetry/sdk-trace-base": "^1.9.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "^4.21.2",
    "http-errors": "~1.6.3",
    "jade": "^1.9.2",
    "morgan": "~1.9.1"
  }
}
```

### 3.2 instalar dependências
```
npm i
```

### 3.3 iniciar aplicação
```
npm run start
```

## Passo 4 - Orquestrar OTLP
```
// Configurando o exportador para traces (usando OTLP via HTTP)
const traceExporter = new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces', // Endereço do OTLP Collector
});

// Configurando o exportador para métricas (usando OTLP via HTTP)
const metricExporter = new OTLPMetricExporter({
    url: 'http://localhost:4318/v1/metrics', // Endereço do OTLP Collector
});
```

## Passo 5 - Executar Collector
### 5.1 realizar download do collector
```
curl --proto '=https' --tlsv1.2 -fOL https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.122.1/otelcol_0.122.1_linux_amd64.tar.gz
tar -xvf otelcol_0.122.1_linux_amd64.tar.gz
```

### 5.2 criar arquivo `otel-config.yaml`, arquivo está disponível no repositório

### 5.3 executar otel collector
```
./otelcol --config otel-config.yaml
```



















