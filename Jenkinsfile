pipeline {
  agent any
  stages {
    when { branch 'master' }
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
