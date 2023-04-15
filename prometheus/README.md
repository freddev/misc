__prometheus__
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'myapp'
    scrape_interval: 5s
    metrics_path: '/metrics'
    static_configs:
      - targets: ['localhost:8080']

```
In this example, we have a simple Prometheus configuration file that defines a single scrape configuration for a hypothetical application called "myapp". The configuration file includes two top-level keys: global and scrape_configs.
Under the global key, we define a global scrape interval of 15 seconds. This setting applies to all scrape configurations defined in the configuration file.
Under the scrape_configs key, we define a single scrape configuration for our "myapp" application. This configuration includes a job_name of "myapp", a scrape_interval of 5 seconds, and a metrics_path of "/metrics". We also define a static_configs section that specifies the target of the scrape configuration. In this case, we're scraping metrics from the local machine on port 8080.
This is just a simplified example, but it demonstrates how to write a basic Prometheus configuration file in YAML format. By defining scrape configurations in this file, you can configure Prometheus to scrape metrics from various targets and collect data for monitoring and analysis.

_fredrik (at) conva se_
