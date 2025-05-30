<h1 align="center">🚀 Advanced Collector Configuration</h1>

이 워크샵의 목표는 Open Telemetry 수집기 구성파일을 만들고 수정하는데 익숙해지도록 돕는 것입니다. 최소한의 agent.yaml 파일로 시작하여 점진적으로 몇가지의 향상된 시나리오를 처리 할 수 있도록 파일을 만들어 나가게 됩니다.

이 워크샵의 핵심은 텔레메트리 데이터를 O11y Cloud로 전송 뿐만 아니라 로컬에 저장하도록 Open Telemetry 수집기를 구성하는 방법을 배우는 것입니다. 이 접근 방식은 디버깅과 문제 해결을 간소화 할 뿐만 아니라 데이터를 프로덕션 시스템으로 전송하지 않는 방식으로 테스트 용도로 활용하기 좋습니다.

이 워크샵을 최대한 활용하려면 다음과 같은 것들이 필요합니다 :

- OpenTelemetry 수집기와 그 구성파일 구조에 대한 기본적인 이해
- YAML 파일 편집에 능숙해야 합니다

## Workshop Overview

이 워크샵에서는 다음 주제를 다룹니다

- **로컬에서 에이전트 설정하기** : 메타데이터 추가하기, 디버그 및 파일 내보내기
- **게이트웨이 구성하기** : 에이전트에서 게이트웨이로 트래픽 라우팅하기
- **FileLog 수신기 구성하기** : 다양한 로그파일에서 로그 데이터를 수집합니다
- **에이전트 복원력 향상하기** : 내결함성을 위한 기본 구성
- **프로세서 구성**
  - 특정 Span (e.g., health checks) 을 삭제하여 노이즈를 감소
  - 불필요한 태그를 제거하고 민감한 데이터 처리
  - Export 전에 파이프라인에서 OTTL(오픈텔레메터리 변환 언어)을 사용해 데이터 변환하기
- **커넥터 구성**
  - 수신 된 값에 따라 데이터를 다른 엔드포인트로 라우팅하기
  - 로그 및 Span 데이터를 메트릭으로 변환하기

이 워크샵이 끝나면 다양한 실제 사용 사례에 맞게 Open Telemetry 수집기를 구성하는데 익숙 해 질 수 있습니다
