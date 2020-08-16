pipeline {
  agent any
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
          params.node_env == 'dev'
        }

      }
      steps {
        echo 'deploying'
        sh '''ssh cdjenkins@172.104.186.220 \'
              git stash
              git pull
              yarn
              yarn build


            \'
            '''
      }
    }

  }
  parameters {
    choice(name: 'node_env', choices: ['dev', 'pro', 'stage'], description: 'Server envrinoment')
  }
}