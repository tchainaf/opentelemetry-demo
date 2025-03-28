# OPEN TELEMETRY HANDS-ON

## Passo 1 - Criar projeto e instalar depêndencias

1.1 criar diretório
```
mkdir opentelemetry-demo
```

1.2 acessar diretório e instalar express
```
cd opentelemetry-demo && npx express-generator
```

1.3 instalar dependências
```
npm i
```

1.5 iniciar aplicação
```
npm run start
```

## Passo 2 - Orquestração dos logs
### 2.1 criar arquivo ```tracing.js``` na raiz / do projeto
### 2.2 arquivo está disponível no respositório

## Passo 3 - Atualizar package.json
### 3.1 atualizar arquivo package.json e inserir dependências open telemetry
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

### 3.2 remover o arquivo package-lock.js e executar novamente o comando 
```
npm i
```

## Passo 4 - Orquestrar OTPL
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
### 5.1 MAC: realizar download do collector
```
curl -L https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.68.0/otelcol_0.68.0_darwin_amd64.tar.gz -o otelcol.tar.gz
tar -xzf otelcol.tar.gz
```

### 5.1 WINDOWS: realizar download do collector
```
curl -L -o otelcol.exe https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest/download/otelcol-windows-amd64.exe
chmod +x otelcol.exe
```

### 5.2 criar arquivo otel-config.yaml, arquivo disponivel no repositório

## 5.3 MAC: executar otel collector
```
./otelcol --config otel-config.yaml
```
## 5.3 WINDOWS: executar otel collector no windows
```
./otelcol.exe --config=config.yaml
```



















