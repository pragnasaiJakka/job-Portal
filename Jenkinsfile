pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "job-portal"
        FRONTEND_IMAGE = "job-frontend"
        BACKEND_CONTAINER = "job-portal-container"
        FRONTEND_CONTAINER = "job-frontend-container"
        BACKEND_PORT = "3000"
        FRONTEND_PORT = "5173"
    }

    stages {
        stage('Clean up old containers') {
            steps {
                sh '''
                    docker rm -f $BACKEND_CONTAINER || true
                    docker rm -f $FRONTEND_CONTAINER || true
                '''
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Run Backend Container') {
            steps {
                sh '''
                    docker run -d \
                        --name $BACKEND_CONTAINER \
                        -p $BACKEND_PORT:3000 \
                        $BACKEND_IMAGE
                '''
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh '''
                        docker build -t $FRONTEND_IMAGE .
                    '''
                }
            }
        }

        stage('Run Frontend Container') {
            steps {
                sh '''
                    docker run -d \
                        --name $FRONTEND_CONTAINER \
                        -p $FRONTEND_PORT:5173 \
                        $FRONTEND_IMAGE
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
