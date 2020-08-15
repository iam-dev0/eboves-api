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
          params.node_env == 'stage'
        }

      }
      steps {
        echo 'deploying'
        sh '''ssh cdjenkins@172.104.186.220 \'
rm -rf /var/www/StagingServer/API/*
\'

rsync -avz -e ssh dist/ cdjenkins@172.104.186.220:/var/www/StagingServer/API
'''
      }
    }

  }
  parameters {
    choice(name: 'node_env', choices: ['stage', 'pro', 'dev'], description: 'Server envrinoment')
  }
}