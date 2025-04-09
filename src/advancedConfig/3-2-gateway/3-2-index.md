# 2. Gateway Setup

OpenTelemetry Gateway는 텔레메트리 데이터를 수신, 처리 및 내보내도록 설계되었습니다. 이 게이트웨이는 텔레메트리 소스(예: 애플리케이션, 서비스)와 백엔드(예: Prometheus, Jaeger 또는 Splunk Observability Cloud와 같은 통합 가시성 플랫폼) 사이의 중개자 역할을 합니다.

이 게이트웨이는 원격 분석 데이터 수집을 중앙 집중화하여 데이터 필터링, 변환, 여러 대상에 대한 라우팅과 같은 기능을 사용할 수 있게 해주므로 유용합니다. 또한 원격 분석 처리를 오프로드하여 개별 서비스의 부하를 줄이고 분산된 시스템에서 일관된 데이터 형식을 보장합니다. 따라서 복잡한 환경에서 원격 분석 데이터를 보다 쉽게 관리, 확장 및 분석할 수 있습니다.

## 게이트웨이 설정하기

1. 게이트웨이 터미널을 열어 `WORKSHOP` 디렉토리로 이동하고, `2-gateway`라는 새 하위 디렉토리를 생성합니다.

2. 게이트웨이 터미널에서 `1-agent` 디렉토리에 있는 `agent.yaml` 파일을 `2-gateway` 디렉토리로 복사합니다

3. `gateway.yaml` 이라는 이름으로 새로운 파일을 생성 한 후, 아래 내용을 붙여넣기합니다

   ```yaml
    ###########################         This section holds all the
    ## Configuration section ##         configurations that can be
    ###########################         used in this OpenTelemetry Collector
    extensions:                       # List of extensions
    health_check:                   # Health check extension
        endpoint: 0.0.0.0:14133       # Custom port to avoid conflicts

    receivers:
    otlp:                           # OTLP receiver
        protocols:
        http:                       # HTTP protocol
            endpoint: "0.0.0.0:5318"  # Custom port to avoid conflicts
            include_metadata: true    # Required for token pass-through

    exporters:                        # List of exporters
    debug:                          # Debug exporter
        verbosity: detailed           # Enable detailed debug output
    file/traces:                    # Exporter Type/Name
        path: "./gateway-traces.out"  # Path for OTLP JSON output
        append: false                 # Overwrite the file each time
    file/metrics:                   # Exporter Type/Name
        path: "./gateway-metrics.out" # Path for OTLP JSON output
        append: false                 # Overwrite the file each time
    file/logs:                      # Exporter Type/Name
        path: "./gateway-logs.out"    # Path for OTLP JSON output
        append: false                 # Overwrite the file each time

    connectors:

    processors:                       # List of processors
    memory_limiter:                 # Limits memory usage
        check_interval: 2s            # Memory check interval
        limit_mib: 512                # Memory limit in MiB
    batch:                          # Batches data before exporting
        metadata_keys:                # Groups data by token
        - X-SF-Token
    resource/add_mode:              # Adds metadata
        attributes:
        - action: upsert              # Inserts or updates a key
        key: otelcol.service.mode   # Key name
        value: "gateway"            # Key value

    ###########################
    ### Activation Section  ###
    ###########################
    service:                          # Service configuration
    telemetry:
        metrics:
        level: none                 # Disable metrics
    extensions: [health_check]      # Enabled extensions
    pipelines:                      # Configured pipelines
        traces:                       # Traces pipeline
        receivers:
        - otlp                      # OTLP receiver
        processors:                 # Processors for traces
        - memory_limiter
        - resource/add_mode
        - batch
        exporters:
        - debug                     # Debug exporter
        - file/traces
        metrics:                      # Metrics pipeline
        receivers:
        - otlp                      # OTLP receiver
        processors:                 # Processors for metrics
        - memory_limiter
        - resource/add_mode
        - batch
        exporters:
        - debug                     # Debug exporter
        - file/metrics
        logs:                         # Logs pipeline
        receivers:
        - otlp                      # OTLP receiver
        processors:                 # Processors for logs
        - memory_limiter
        - resource/add_mode
        - batch
        exporters:
        - debug                     # Debug exporter
        - file/logs
   ```

> 📝 Note  
> Gateway 가 실행되면 아래와 같은 세 개의 파일이 생성됩니다
>
> gateway-traces.out  
> gateway-metrics.out  
> gateway-logs.out
>
> 왜 세 개의 output 파일이 생성될까요? 위 gateway.yaml 파일을 보고 이유를 한번 분석 해 봅시다

성공적으로 진행했다면 아래와 같은 디렉터리 구조를 확인 할 수 있습니다

```bash
.
├── agent.yaml
└── gateway.yaml
```
