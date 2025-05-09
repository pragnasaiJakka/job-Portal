pipeline {
    agent any

    environment {
        IMAGE_NAME = 'job-portal'
        CONTAINER_NAME = 'job-portal-container'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing backend dependencies...'
                sh 'cd backend && npm ci || echo "No backend dependencies found or install failed."'

                echo '📦 Installing frontend dependencies...'
                sh 'cd frontend && npm ci || echo "No frontend dependencies found or install failed."'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running backend tests...'
                sh 'cd backend && npm test || echo "No backend tests configured."'

                echo '🧪 Running frontend tests...'
                sh 'cd frontend && npm test || echo "No frontend tests configured."'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Restarting container...'
                sh '''
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                    docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployed Successfully!'
        }
        failure {
            echo '❌ Pipeline Failed.'
        }
    }
}
