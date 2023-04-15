__elastisearch__
```python
from elasticsearch import Elasticsearch

es = Elasticsearch()

query = {
    "query": {
        "query_string": {
            "default_field": "text",
            "query": "search terms"
        }
    }
}

res = es.search(index="my_index", body=query)
for hit in res['hits']['hits']:
    print(hit['_source'])
```
_fredrik (at) conva se_
