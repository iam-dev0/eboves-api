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
          BRANCH_NAME == 'dev'
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
}