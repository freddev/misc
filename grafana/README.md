__Grafana__
Grafana is a visualization tool that supports multiple data sources. Below is an example of how to create a simple dashboard with a single panel that shows data from a Prometheus data source.
```json
{
  "id": null,
  "title": "My Dashboard",
  "panels": [
    {
      "id": 1,
      "title": "My Panel",
      "type": "graph",
      "datasource": "Prometheus",
      "targets": [
        {
          "expr": "up",
          "legendFormat": "{{instance}}",
          "interval": "",
          "refId": "A"
        }
      ],
      "xaxis": {
        "show": true
      },
      "yaxes": [
        {
          "format": "short",
          "show": true
        },
        {
          "format": "short",
          "show": true
        }
      ],
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 0
      },
      "alert": {
        "conditions": [
          {
            "evaluator": {
              "params": [
                1
              ],
              "type": "lt"
            },
            "operator": {
              "type": "and"
            },
            "query": {
              "params": [
                "A",
                "5m",
                "now"
              ]
            },
            "reducer": {
              "params": [],
              "type": "avg"
            },
            "type": "query"
          }
        ],
        "executionErrorState": "alerting",
        "frequency": "1m",
        "handler": 1,
        "message": "Panel {{panel.title}} has exceeded the threshold.",
        "name": "My Panel Alert",
        "noDataState": "no_data",
        "notifications": []
      }
    }
  ],
  "editable": true,
  "gnetId": null,
  "timezone": "browser",
  "links": [],
  "schemaVersion": 16,
  "version": 0
}

```
This example defines a dashboard with a single graph panel that shows data from a Prometheus data source. The panel shows the up metric and uses the instance label as the legend. The dashboard also includes an alert that triggers when the up metric falls below 1.

The JSON configuration can be imported into Grafana to create the dashboard. The dashboard can be customized further by modifying the configuration.


_fredrik (at) conva se_
