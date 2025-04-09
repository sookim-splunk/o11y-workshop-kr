# 6. Redacting Sensitive Data

이 실습에서는 특정 태그를 제거하고 텔레메트리 범위에서 민감한 데이터를 삭제하도록 OpenTelemetry 수집기를 구성하는 방법에 대해 설명합니다. 이는 신용카드 번호, 개인 데이터 또는 처리 또는 내보내기 전에 익명화해야 하는 기타 보안 관련 세부정보와 같은 민감한 정보를 보호하는 데 매우 중요합니다.

다음을 포함하여 OpenTelemetry 수집기에서 주요 프로세서를 구성하는 방법을 안내해 드리겠습니다:

- **Attrbutes Processor :** 특정 스팬 속성을 수정하거나 제거합니다.
- **Redaction Processor :** 민감한 데이터가 저장 또는 전송되기 전에 삭제되도록 합니다.
  <br>

## 실습 준비하기

- `WORKSHOP` 디렉토리에서 `6-sensitive-data` 라는 이름의 서브도메인을 생성합니다
- 그런다음, `5-dropping-span` 디렉토리에서 `6-sensitive-data` 디렉토리로 `*.yaml` 파일을 모두 복제합니다

> ⚠️ **Warning** <br>
> 이 시점부터 본 실습은 모든 터미널 창에서 **_~/WORKSHOP/6-sensitive-data_** 디렉터리 경로에서 실행됩니다.

이 모듈의 작업 디렉토리가 아래와 같은 파일로 구성되어있어야 합니다

```bash
.
├── agent.yaml
└── gateway.yaml
```
