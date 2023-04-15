__Jenkins__
``` 
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'mvn clean install'
      }
    }
    stage('Test') {
      steps {
        sh 'mvn test'
      }
    }
    stage('Deploy') {
      steps {
        sh 'ansible-playbook deploy.yml'
      }
    }
  }
}
```

_fredrik (at) conva se_
