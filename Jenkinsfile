node {
        stage('swc'){
                git branch: 'master', url: 'https://github.com/manfer993/test-postman-newman.git'
        }
        stage('Install node modules'){
                sh "npm install"
        }
        stage('Test'){
                sh "npm run test"
        }       
}