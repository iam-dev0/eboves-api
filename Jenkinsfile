pipeline {
  agent any

  parameters {
    choice(name: 'node_env', choices: ['stage', 'pro', 'dev'], description: 'Server envrinoment')
  }

  stages {
    stage('Prepare Workspace') {
      steps {
        sh 'yarn'
      }
    }

    stage('build') {
      steps {
        sh 'yarn build'
      }
    }

    stage('deploy') {
      when {
        expression {
          params.node_env == 'stage'
        }
      }
      steps {
        echo 'deploying'
      }
    }

  }

}