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
      environment {
        JEST_HTML_REPORTER_OUTPUT_PATH = 'output/html-reporter/report.html'
      }
      steps {
        sh 'npm test -- --ci --reporters=default --reporters=jest-junit --reporters=jest-html-reporter'
      }
      post {
        always {
          junit 'junit.xml'
          publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: false,
            reportDir: 'output/html-reporter',
            reportFiles: 'report.html',
            reportTitles: 'Jest Test Results',
            reportName: 'Test Results',
          ])
        }
      }
    }
  }
}
