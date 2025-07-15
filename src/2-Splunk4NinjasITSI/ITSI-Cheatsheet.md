## 1. Data Input Modular

```bash
# Pods Infra utilization

data('container_cpu_utilization', rollup='rate').sum(by=['k8s.pod.name', 'k8s.node.name', 'k8s.cluster.name', 'k8s.pod.uid']).scale(0.01).publish();
data('container.memory.usage', filter=filter('k8s.cluster.name', '*') and filter('k8s.namespace.name', '*') and filter('sf_tags', '*', match_missing=True) and filter('k8s.deployment.name', '*', match_missing=True)).sum(by=['k8s.container.name', 'k8s.pod.name', 'k8s.node.name', 'k8s.cluster.name', 'k8s.pod.uid']).publish();
data('container.filesystem.usage', filter=filter('k8s.cluster.name', '*') and filter('k8s.namespace.name', '*') and filter('sf_tags', '*', match_missing=True) and filter('k8s.deployment.name', '*', match_missing=True)).sum(by=['k8s.container.name', 'k8s.pod.name', 'k8s.node.name', 'k8s.cluster.name', 'k8s.pod.uid']).publish();
```

</br>

```bash
# APM Traffic & Errors
thruput_avg_rate = data('service.request.count', filter=filter('sf_environment', '*') and filter('sf_service', '*') and (not filter('sf_dimensionalized', '*')), rollup='rate').sum(by=['sf_service', 'sf_environment']).publish(label='thruput_avg_rate');
error_durations_p99 = data('service.request' + '.duration.ns.' + 'p99', filter=filter('sf_environment', '*') and filter('sf_service', '*') and filter('sf_error','*') and not filter('sf_dimensionalized', '*') and filter('sf_error', 'true'), rollup='max').mean(by=['sf_service', 'sf_environment', 'sf_error'], allow_missing=['sf_httpMethod']).publish(label='error_durations_p99');
non_error_durations_p99 = data('service.request' + '.duration.ns.' + 'p99', filter=filter('sf_environment', '*') and filter('sf_service', '*') and filter('sf_error','*') and not filter('sf_dimensionalized', '*') and filter('sf_error', 'false'), rollup='max').mean(by=['sf_service', 'sf_environment', 'sf_error'], allow_missing=['sf_httpMethod']).publish(label='non_error_durations_p99');
error_durations = data('service.request' + '.duration.ns.' + 'median', filter=filter('sf_environment', '*') and filter('sf_service', '*') and filter('sf_error','*') and not filter('sf_dimensionalized', '*') and filter('sf_error', 'true'), rollup='max').mean(by=['sf_service', 'sf_environment', 'sf_error'], allow_missing=['sf_httpMethod']).publish(label='error_durations');
non_error_durations = data('service.request' + '.duration.ns.' + 'median', filter=filter('sf_environment', '*') and filter('sf_service', '*') and filter('sf_error','*') and not filter('sf_dimensionalized', '*') and filter('sf_error', 'false'), rollup='max').mean(by=['sf_service', 'sf_environment', 'sf_error'], allow_missing=['sf_httpMethod']).publish(label='non_error_durations');
error_counts = data('service.request' + '.count', filter=filter('sf_environment', '*') and filter('sf_service', '*') and filter('sf_error','*') and not filter('sf_dimensionalized', '*') and filter('sf_error', 'true'), rollup='sum').sum(by=['sf_service', 'sf_environment', 'sf_error'], allow_missing=['sf_httpMethod']).publish(label='error_counts');
non_error_counts = data('service.request' + '.count', filter=filter('sf_environment', '*') and filter('sf_service', '*') and filter('sf_error','*') and not filter('sf_dimensionalized', '*') and filter('sf_error', 'false'), rollup='sum').sum(by=['sf_service', 'sf_environment', 'sf_error'], allow_missing=['sf_httpMethod']).publish(label='non_error_counts');
```

</br>

```bash
data('rum.page_view.count').publish(label='rum_page_view'); data('rum.client_error.count').publish(label='rum_client_error'); data('rum.page_view.time.ns.p75').scale(0.000001).publish(label='rum_page_view_time'); data('rum.resource_request.count').publish(label='rum_resource_request'); data('rum.resource_request.time.ns.p75').scale(0.000001).publish(label='rum_resource_request_time'); data('rum.crash.count').publish(label='rum_crash_count'); data('rum.app_error.count').publish(label='rum_app_error_count'); data('rum.cold_start.time.ns.p75').scale(0.000001).publish(label='rum_cold_start_time'); data('rum.cold_start.count').publish(label='rum_cold_start_count'); data('rum.webvitals_lcp.time.ns.p75').scale(0.000001).publish(label='rum_webvitals_lcp'); data('rum.webvitals_cls.score.p75').publish(label='rum_webvitals_cls'); data('rum.webvitals_fid.time.ns.p75').scale(0.000001).publish(label='rum_webvitals_fid');
```

</br>

```bash
data('*', filter=filter('sf_product', 'synthetics') and filter('test_type', '*')).publish();
data('synthetics.run.uptime.percent', filter=filter('test_type', 'browser')and filter('test', '*')).mean(over=Args.get('ui.dashboard_window', '15m')).mean(by=['test']).publish();
data('synthetics.duration.time.ms', filter=filter('test', '*') and filter('test_type', 'browser')).mean(by=['location', 'location_id', 'test_id', 'test_type']).publish();
```
