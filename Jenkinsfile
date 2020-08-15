pipeline {
  agent any
  stages {
    stage('Prepare Workplace') {
      steps {
        echo 'prepaing'
        sh 'yarn'
      }
    }

    stage('build') {
      steps {
        echo 'building'
      }
    }

    stage('deploy') {
      steps {
        echo 'deploying'
      }
    }

  }
}
