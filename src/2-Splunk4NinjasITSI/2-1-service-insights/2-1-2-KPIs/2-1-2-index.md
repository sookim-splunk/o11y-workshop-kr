# 2-1-2. KPI 란?

### Key Performance Indicators

- 각 서비스마다 그 서비스의 성과를 평가할 수 있는 KPI를 정의해야 합니다
- KPI는 서비스의 기능과 관련된 특정 수치를 측정하는 지표입니다
- 비즈니스 서비스의 경우, KPI는 주로 목표 달성 여부를 측정하는 지표입니다 </br>
  _예: 매출, 품질, 거래 건수 등_
- 기술 서비스의 경우, KPI는 주로 장치나 프로세스의 성능 지표입니다 </br>
  _예: CPU 사용률, 네트워크 부하 등_

  </br>

### KPI 지표는 어떤것이 되어야 하나요?

| KPI 기준                                    | 설명                                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| 🧠 **It is meaningful**                     | KPI를 보는 사람이 무엇을 의미하는지 쉽게 이해할 수 있어야 한다                         |
| ⚙️ **It is relevant**                       | ITSI에서 달성하려는 목표와 관련성이 있어야 한다                                        |
| 💻 **It is actionable**                     | KPI가 문제를 나타내면 누군가가 조사하거나 조치를 취할 수 있어야 한다                   |
| 📈 **It is a value that changes over time** | 시간이 지나면서 값이 변해야 하며, 과거 추세와 비교해 현재 상태를 평가할 수 있어야 한다 |
| 🧭 **It can be used proactively**           | KPI 편차를 사전에 측정할 수 있어야 하며, 장애가 발생하기 전에 대응할 수 있어야 한다    |

</br>

### 어떤 것이 좋은 KPI 일까요?

1. **정기적인 데이터 제공** : 데이터가 간헐적이거나 드물게만 업데이트 된다면 KPI로 적합하지 않습니다. 연속성이 있는 데이터가 좋습니다
2. **정규화 된 데이터** : 대부분의 경우 단순한 숫자보다는 백분율(%) 이 더 유용합니다
3. **변화값(증감/Delta) 을 제공** : 맥락 파악에 필요합니다. 예를 들어 방문자 수 30% 증가 및 CPU 사용률 10% 증가 등의 데이터로 추세 분석이 가능해집니다
4. **상태와 무관하게 제공** : 문제 발생 시에만 나타나는 KPI가 아닌 정기적인 데이터가 있어야 사전 대응이 가능해집니다

</br>

### KPI 예시는 아래와 같습니다

| 범주                   | 예시 KPI                                                                        |
| ---------------------- | ------------------------------------------------------------------------------- |
| 🛒 **온라인 판매**     | - 판매된 상품 수<br>- 총 주문된 상품 수<br>- 조회된 상품 수<br>- 반품된 상품 수 |
| 😊 **고객 만족도**     | - 댓글 수<br>- 평균 평점                                                        |
| 🌐 **네트워크**        | - 총 트래픽<br>- 평균 지연 시간<br>- 노드 수                                    |
| 🖥️ **웹 팜(Web Farm)** | - CPU 사용률<br>- 사용 가능한 메모리<br>- 남은 저장 공간                        |

---

</br>
</br>

## LAB 02. 서비스와 KPI 를 정의합시다

Lab 01 에서 기술되었던 시나리오와 받은 요구사항을 기억하시나요?

그 요구사항은 조금 하이레벨의 전체적인 요구사항이었다면, 실제로 기술 서비스를 서포트하는 팀에서는 어떤 도구를 가지고 모니터링 데이터를 수집하고 있으며, 실제로 서비스를 모니터링 할 때 어떤 지표를 주로 살피는지를 조사해야합니다.

아래 기술팀에서 받은 KPI 측정 요구사항을 읽고 이해 해 봅시다

<div style="border:1px solid #ddd; padding:12px; border-radius:8px; background-color:#e6f7ff;">
<strong>KPI 측정 요구사항</strong><br></br>

1. 우리는 MSA 환경에 구성 된 Online Boutique 서비스를 모니터링 하기 위해 Splunk Obsevability Cloud 를 사용하고 있습니다 **_-> O11y Cloud 로 부터 데이터를 수집해야함_**
2. 해당 모니터링 솔루션을 통해 frontend 쪽은 Synthetics 를 통한 브라우저 테스트, RUM을 통한 사용자 행동에 대한 모니터링을 하고 있으며 **_-> frontend 단 수집 대상 항목 정리_**
3. **Synthetics** 는 주로 Resource request count, request error count, dom complete time, run duration 등을 모니터링합니다
4. **RUM**의 경우에는 page view count, client error count, web vital (LCP, CLS, FID)를 모니터링합니다
5. 백엔드 서비스를 모니터링 하기 위해 **APM instrument** 를 통해 데이터를 수집합니다. 주로 API로 조회 된 리퀘스트의 숫자와 그 중 발생한 에러의 숫자를 모니터링 합니다
6. 또한 K8S 환경에 배포 된 Agent 를 통해 **Pod 단위로 리소스 사용률**(CPU, Memory, Disk)을 모니터링 하고 있습니다
7. 이 모든 것이 서비스 분석 트리에 반영되었으면 좋겠습니다
</div>

</br>

### 1. APM 서비스 및 KPI 정의

아래와 같은 표가 있다고 가정했을 때 빈 칸을 한번 채워넣어봅시다

- Service 이름 : _cartservice-c#_

| KPI Name             | Requirement        | Freq.    | Time Span | Imp.       | Thresshold |
| -------------------- | ------------------ | -------- | --------- | ---------- | ---------- |
| Service Health Score | Overall efficiency | 1 min    | 15 min    | --         | --         |
| Request Count        | 제품이 조회된 횟수 | 1 min    | 15 min    | 5          | high       |
| _<KPI_Name_1>_       | _<요구사항 기술>_  | _<빈도>_ | _<스팬>_  | _<가중치>_ | _<중요도>_ |

<details>
<summary><b>📌 [정답 보기] 여기를 클릭해서 APM KPI 표를 확인하세요! </b></summary>

| KPI Name             | Requirement                     | Freq. | Time Span | Imp. | Threshold |
| -------------------- | ------------------------------- | ----- | --------- | ---- | --------- |
| Service Health Score | Overall efficiency              | 1 min | 15 min    | --   | --        |
| Request Count        | 제품이 조회된 횟수              | 1 min | 15 min    | 5    | high      |
| Request Error Count  | 제품 조회 시 발생된 에러의 횟수 | 1 min | 15 min    | 10   | High      |

</details>

</br>

### 2. 인프라 서비스 및 KPI 정의

위 단원에서 확인한 요구사항을 기준으로 정의내린 Application 관련 서비스를 만들어보았습니다, 이제는 요구사항을 조금 더 분석하여 인프라 관점의 서비스와 KPI를 정의 해 봅시다

아래와 같은 표가 있다고 가정했을 때 빈 칸을 한번 채워넣어봅시다

- Service 이름 : _cartservice-k8s_

| KPI Name             | Requirement        | Freq.    | Time Span | Imp.       | Thresshold |
| -------------------- | ------------------ | -------- | --------- | ---------- | ---------- |
| Service Health Score | Overall efficiency | 1 min    | 15 min    | --         | --         |
| CPU Utilization      | CPU 사용률         | 1 min    | 15 min    | 5          | mid        |
| _<KPI_Name_1>_       | _<요구사항 기술>_  | _<빈도>_ | _<스팬>_  | _<가중치>_ | _<중요도>_ |
| _<KPI_Name_2>_       | _<요구사항 기술>_  | _<빈도>_ | _<스팬>_  | _<가중치>_ | _<중요도>_ |

<details>
<summary><b>📌 [정답 보기] 여기를 클릭해서 Infra KPI 표를 확인하세요! </b></summary>

| KPI Name             | Requirement         | Freq. | Time Span | Imp. | Thresshold |
| -------------------- | ------------------- | ----- | --------- | ---- | ---------- |
| Service Health Score | Overall efficiency  | 1 min | 15 min    | --   | --         |
| CPU Utilization(%)   | CPU 평균 사용률     | 1 min | 15 min    | 5    | mid        |
| Memory Usage(%)      | Memory 평균 사용률  | 1 min | 15 min    | 5    | mid        |
| FS Usage(%)          | Storage 평균 사용률 | 1 min | 15 min    | 5    | mid        |

</details>

</br>

### 3. 프론트 서비스 및 KPI 정의

위 요구사항을 살펴보면 Frontend 를 이루고 있는 Infra/APM도 있지만, Synthetics 같은 브라우저 테스트와 RUM 이라는 유저 익스피리언스 모니터링도 함께 사용하는 것을 알 수 있습니다. 해당 모니터링에 대한 KPI도 같이 정의 해 봅시다

- Service 이름 : _Synthetics Test_

| KPI Name               | Requirement        | Freq.    | Time Span | Imp.       | Thresshold |
| ---------------------- | ------------------ | -------- | --------- | ---------- | ---------- |
| Service Health Score   | Overall efficiency | 1 min    | 15 min    | --         | --         |
| Resource request count | 리소스 조회 수     | 1 min    | 15 min    | 5          | mid        |
| _<KPI_Name_1>_         | _<요구사항 기술>_  | _<빈도>_ | _<스팬>_  | _<가중치>_ | _<중요도>_ |
| _<KPI_Name_2>_         | _<요구사항 기술>_  | _<빈도>_ | _<스팬>_  | _<가중치>_ | _<중요도>_ |

</br>

- Service 이름 : _RUM Application_

| KPI Name             | Requirement        | Freq.    | Time Span | Imp.       | Thresshold |
| -------------------- | ------------------ | -------- | --------- | ---------- | ---------- |
| Service Health Score | Overall efficiency | 1 min    | 15 min    | --         | --         |
| page view count      | 페이지 조회 수     | 1 min    | 15 min    | 5          | mid        |
| _<KPI_Name_1>_       | _<요구사항 기술>_  | _<빈도>_ | _<스팬>_  | _<가중치>_ | _<중요도>_ |
| _<KPI_Name_2>_       | _<요구사항 기술>_  | _<빈도>_ | _<스팬>_  | _<가중치>_ | _<중요도>_ |

</br>

<details>
<summary><b>📌 [정답 보기] 여기를 클릭해서 Frontend KPI 표를 확인하세요! </b></summary>

- Service 이름 : _RUM Application_

| KPI Name             | Requirement        | Freq. | Time Span | Imp. | Thresshold |
| -------------------- | ------------------ | ----- | --------- | ---- | ---------- |
| Service Health Score | Overall efficiency | 1 min | 15 min    | --   | --         |
| page view count      | 페이지 조회 수     | 1 min | 15 min    | 5    | mid        |
| client errors        | 클라이언트 에러 수 | 1 min | 15 min    | 5    | mid        |
| resource requests    | 리소스 리퀘스트 수 | 1 min | 15 min    | 5    | mid        |
| cls p75              | CLS 점수           | 1 min | 15 min    | 5    | mid        |
| fid p75              | FID 점수           | 1 min | 15 min    | 5    | mid        |
| lcp p75              | LCP 점수           | 1 min | 15 min    | 5    | mid        |

- Service 이름 : _Synthetics Test_

| KPI Name               | Requirement         | Freq. | Time Span | Imp. | Thresshold |
| ---------------------- | ------------------- | ----- | --------- | ---- | ---------- |
| Service Health Score   | Overall efficiency  | 1 min | 15 min    | --   | --         |
| Resource request count | 리소스 조회 수      | 1 min | 15 min    | 5    | mid        |
| resource errors        | 리소스 조회 에러 수 | 1 min | 15 min    | 5    | mid        |
| run duration           | 수행 시간           | 1 min | 15 min    | 5    | mid        |
| run count              | 테스트 수행 횟수    | 1 min | 15 min    | 5    | mid        |

</br>

</details>

**LAB 02 Done!**
