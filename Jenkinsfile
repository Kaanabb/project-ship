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
                    bat 'npm start'
                }
            }
        }
        
        // Add more stages as needed
    }
}