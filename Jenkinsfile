pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install --force'
                }
            }
        }
        
        stage('Build') {
            steps {
                dir('frontend') {
                    bat 'npm test --watchAll=false'
                }
            }
        }
        
        // Add more stages as needed
    }
}