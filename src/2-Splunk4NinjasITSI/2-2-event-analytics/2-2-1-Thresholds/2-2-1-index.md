# 2-1-5. 엔티티 디스커버리 서치와 엔티티 타입

</br>

이 모듈에서는 온라인 부티크 서비스에 대한 엔터티를 식별하고, 엔터티를 추가하고, 모듈 KPI를 사용하여 새로운 기술 서비스를 만들고, 엔터티에 엔터티 유형을 적용하고, 엔터티 상태 페이지를 사용하고, 엔터티 삭제 정책을 만듭니다.

## LAB 05.

### 1. KPI 수정하기

- **[ITSI] > [Configuration] > [Service Monitoring] > [KPI Base Search]** 페이지로 이동합니다
- 기존에 생성했던 **_OBQ : Infrastructure_** KPI Base Search 를 클릭하여 설정 화면으로 들어갑니다
- 옵션 하단에 **Split by Entity** 부분을 **Yes** 로 변경 후 아래와 같이 _k8s.pod.name_ 을 입력합니다

  <img src="../../../images/2-ninja-itsi/2-1-5-config2.jpg" width="400" style="border: 1px solid #000; block; margin-left: 0;">

- 저장하고 빠져나옵니다
- **[ITSI] > [Configuration] > [Service Monitoring] > [Service & KPI Management]** 페이지로 이동합니다
- 서비스 목록에서 _checkoutservice_ 클릭 후 KPIs 탭을 클릭합니다
- CPU Utilization KPI 항목을 클릭후 Threshold 부분을 확장합니다
- **Per-Entity Thresholds** 탭을 선택 후 아랫쪽에 표시되는 차트를 확인합니다
- Threshold 정의 부분에서 톱니바퀴를 클릭 후 뜨는 팝업창에서 **Boundary Mode**를 둘 다 Disabled 해줍니다

  <img src="../../../images/2-ninja-itsi/2-1-5-config1.jpg" width="400" style="border: 1px solid #000; block; margin-left: 0;">

- 적용 후에는 아래 스크린샷과 같이 그래프 내에 표시되는 선이 여러개로 표현되어야합니다

  <img src="../../../images/2-ninja-itsi/2-1-5-config3.jpg" width="600" style="border: 1px solid #000; block; margin-left: 0;">

- 변경 사항을 저장합니다

</br>

### 2. Infra Entity Discovery Search 생성하기

- **[ITSI] > [Configuration] > [Entity Management]** 메뉴로 이동합니다
- 오른쪽 상단에 **[Create Entity] > [Import from Search]** 버튼을 눌러 생성을 시작합니다

  <img src="../../../images/2-ninja-itsi/2-1-5-config4.jpg" width="800" style="border: 1px solid #000; block; margin-left: 0;">

  - Ad Hoc Search 선택
  - 아래 다음과 같은 SPL문을 입력합니다
    ```bash
    | mstats
    avg("container_cpu_utilization") as cpu_utilization,
    avg("container.memory.usage") as memory_usage,
    avg("container.filesystem.usage") as filesystem_usage
    WHERE index=sim_metrics
    BY k8s.pod.name, host, kubernetes_cluster
    span=5m
    | dedup k8s.pod.name
    | eval ITSIUniqueId='k8s.pod.name'
    | rename k8s.pod.name as dim_pod_name, host as dim_host, kubernetes_cluster as dim_kubernetes_cluster
    | fields dim_*, ITSIUniqueId
    | rename dim_* as *
    | eval entity_type="K8S_Pods", Vendor="Kubernetes"
    ```
  - 돋보기 버튼을 눌러 SPL문이 제대로 작동하고, 아래에 엔티티가 표시되는지 확인합니다
  - **[Next]** 버튼을 누릅니다

- 다음 불러오기 된 키 컬럼들을 각각 알맞는 필드에 매칭시킵니다
  <img src="../../../images/2-ninja-itsi/2-1-5-config11.jpg" width="800" style="border: 1px solid #000; block; margin-left: 0;">
- 스크린샷 처럼 필드를 매칭 시킨 후 **[Import]** 버튼을 클릭합니다
- **[Set up Recurring Import]** 버튼을 클릭하여 지속적으로 엔티티를 업데이트 하도록 saved search 를 등록합니다

  <img src="../../../images/2-ninja-itsi/2-1-5-config7.jpg" width="500" style="border: 1px solid #000; display: block; margin-left: 0;">

  - **Title :** _OBQ-kube-Infra1_ 입력
  - **Schedule :** Run on Cron schedule 선택
  - **Cron Schedule :** \*/5 \* \* \* (5분에 한번 실행)

- 생성을 완료합니다

</br>

### 3. Infra Entity Type 생성하기

- **[ITSI] > [Configuration] > [Entity Management]** 메뉴에서 [Entity Type] 탭을 클릭 후 오른쪽 상단에 있는 [Create Entity Type] 버튼을 클릭합니다
- Entity Type Name : K8S_Pods 입력
- Vital Metrics 부분을 확장 후 [Add Metics] 버튼을 클릭

    <img src="../../../images/2-ninja-itsi/2-1-5-config8.jpg" width="500" style="border: 1px solid #000; display: block; margin-left: 0;">

  - Metric Title에 cpu_utilization 이라고 입력하고 저장합니다
  - SPL을 아래와 같이 붙여넣기 합니다

  ```bash
  | mstats avg(container_cpu_utilization) as val
    WHERE index=sim_metrics
    BY k8s.pod.name
    span=5m
  | eval _key = 'k8s.pod.name'
  | table _time, _key, val
  ```

  - [Run Search] 버튼을 눌러 Disply Preview에 값이 들어오는지 확인합니다
  - \_key 로 인식된 필드를 ITSIUniqueId와 매핑시켜줍니다
  - 아래에 차례로 Memory 와 Filesystem 메트릭을 각각 추가 해 줍니다

  ```bash
  # memory_usage
  | mstats avg(container.memory.usage) as val
  WHERE index=sim_metrics
  BY k8s.pod.name
  span=5m
  | eval _key = 'k8s.pod.name'
  | table _time, _key, val

  # filesystem_usage
  | mstats avg(container.filesystem.usage) as val
  WHERE index=sim_metrics
  BY k8s.pod.name
  span=5m
  | eval _key = 'k8s.pod.name'
  | table _time, _key, val
  ```

- 각각 메트릭을 모두 불러오고 \_key 필드를 매핑시켜 주었으면 하단에 있는 [Choose a Key Metric] 부분에서 cpu_utilization 메트릭을 선택 해 준 후, [Save] 버튼을 눌러 Entity Type 생성을 완료합니다

- [ITSI] > [Entity Overview] 메뉴로 가면 K8S_Pods 라는 엔티티 타입이 생기고, 파드가 인식되어 표시되는 것을 볼 수 있습니다

  <img src="../../../images/2-ninja-itsi/2-1-5-config9.jpg" width="300" style="border: 1px solid #000; display: block; margin-left: 0;">

- K8S_Pods 타일을 눌러 엔티티 내용을 확인 해 봅니다

  <img src="../../../images/2-ninja-itsi/2-1-5-config10.jpg" width="800" style="border: 1px solid #000; display: block; margin-left: 0;">

  위와 같이 Entity 들이 제대로 보여지면 제대로 적용이 완료 된 것입니다

</br>

### 4. Application Entity 식별 및 Entity Type 생성하기

```bash
| mstats count(_value) as count
  WHERE index=sim_metrics AND metric_name="traces.count"
  BY sf_service, sf_operation, sf_environment, sf_error
  span=5m
| dedup sf_service, sf_operation
| eval ITSIUniqueId = sf_service + sf_environment . ":" . sf_operation
| rename sf_service as dim_sf_service,
         sf_operation as dim_sf_operation,
         sf_environment as dim_sf_environment,
         sf_error as dim_sf_error
| fields dim_*, ITSIUniqueId
| rename dim_* as *
| eval entity_type="APM Operations"
```

```bash
# Traces Count
| mstats avg("traces.count") as val
WHERE index=sim_metrics
BY sf_service, sf_environment, sf_operation
span=5m
| eval name = sf_service + sf_environment . ":" . sf_operation
| table _time, name, val, sf_service, sf_environment, sf_operation

# Trace Duration P99
| mstats avg("traces.duration.ns.p99") as val
WHERE index=sim_metrics
BY sf_service, sf_environment, sf_operation
span=5m
| eval name = sf_service + sf_environment . ":" . sf_operation
| table _time, name, val, sf_service, sf_environment, sf_operation

# Trace Error Count
| mstats avg("traces.count") as val
WHERE index=sim_metrics AND sf_error=true
BY sf_service, sf_environment, sf_operation
span=5m
| eval name = sf_service + sf_environment . ":" . sf_operation
| table _time, name, val, sf_service, sf_environment, sf_operation

# Trace Error Duration P99
| mstats avg("traces.duration.ns.p99") as val
WHERE index=sim_metrics AND sf_error=true
BY sf_service, sf_environment, sf_operation
span=5m
| eval name = sf_service + sf_environment . ":" . sf_operation
| table _time, name, val, sf_service, sf_environment, sf_operation
```

</br>

### 5. Frontend Entity 식별 및 Entity Type 생성하기

</br>

### 6. Synthetics Entity 식별 및 Entity Type 생성하기
