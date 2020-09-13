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

    stage('deploy dev') {
      when {
        expression {
          BRANCH_NAME == 'dev'
        }

      }
      steps {
        echo 'deploying'
        sh '''ssh cdjenkins@172.104.186.220 \'
              cd /var/www/StagingServer/api
              git stash
              git pull
              git checkout dev

              yarn
              yarn build
              pm2 restart devapi
            \'
            '''
      }
    }

    stage('deploy master') {
      when {
        expression {
          BRANCH_NAME == 'master'
        }

      }
      steps {
        echo 'deploying'
        sh '''ssh cdjenkins@172.104.186.220 \'
              cd /var/www/LiverServer/api
              git stash
              git pull
              git checkout master

              yarn
              yarn build
              pm2 restart proapi
            \'
            '''
      }
    }
  }
}