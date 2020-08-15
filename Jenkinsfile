pipeline {
  agent any
  stages {
    stage('Prepare Workplace') {
      parallel {
        stage('Prepare Workplace') {
          steps {
            echo 'prepaing'
            sh 'yarn'
          }
        }

        stage('sad') {
          steps {
            echo 'hello'
          }
        }

        stage('asd') {
          steps {
            echo 'hello'
          }
        }

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
  environment {
    node_env = 'stagging'
  }
}