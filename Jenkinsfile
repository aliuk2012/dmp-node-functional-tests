#!/bin/groovy
pipeline {
  agent {
    dockerfile {
      args '--cap-add=SYS_ADMIN --init -v /dev/shm:/dev/shm'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'cp -r /app/node_modules .' // quick-and-dirty workaround
      }
    }
    stage('Test') {
      steps {
        sh 'npm test -- --ci --reporters=default --reporters=jest-junit'
      }
      post {
        always {
          junit 'junit.xml'
        }
      }
    }
  }
}
