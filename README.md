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

1.4 instalar dependências open telemetry
```
npm install --save @opentelemetry/api
npm install --save @opentelemetry/sdk-node
npm install --save @opentelemetry/auto-instrumentations-node
npm install --save @opentelemetry/exporter-metrics-otlp-http
npm install --save @opentelemetry/exporter-trace-otlp-http
```

1.5 iniciar aplicação
```
npm run start
```

## Passo 2 - Orquestração dos logs
### 2.1 criar arquivo tracing.js na raiz / do projeto
### 2.2 arquivo está disponível no respositório

## Passo 3 - Atualizar package.json
3.1 alterar o arquivo package.json
```
"scripts": {
"start": "node -r ./tracing.js ./bin/www"
},
```

3.2 remover o arquivo package-lock.js e executar novamente o comando 
```
npm i
```

# Passo 4 - Orquestrar OTPL
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

# Passo 5 - Executar Collector
5.1 realizar download do collector
```
curl -L https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.68.0/otelcol_0.68.0_darwin_amd64.tar.gz -o otelcol.tar.gz
tar -xzf otelcol.tar.gz
```

## 5.2 criar arquivo otel-config.yaml, arquivo disponivel no repositório

## 5.3 executar otel collector
```
./otelcol --config otel-config.yaml
```



















