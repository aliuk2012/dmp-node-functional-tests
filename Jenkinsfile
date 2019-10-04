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
        sh 'npm test -- --ci --reporters=default --reporters=jest-junit --reporters=jest-html-reporters'
      }
      post {
        always {
          junit 'junit.xml'
          sh 'mkdir -p output/html-reporters && cp jest_html_reporters.html output/html-reporters/report.html'
          publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: false,
            reportDir: 'output/html-reporters',
            reportFiles: 'report.html',
            reportTitles: 'Jest Test Results',
            reportName: 'Test Results',
          ])
        }
      }
    }
  }
}
