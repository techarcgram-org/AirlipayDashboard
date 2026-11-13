// =============================================================================
// File: Jenkinsfile
// Purpose: Push-to-main build for AirlipayDashboard on the infra Jenkins host.
//          Lints the project, then builds the production image with the
//          API base URL baked in (NEXT_PUBLIC_BASE_URL is inlined into the
//          Next.js bundle at build time) and pushes it to GHCR as an
//          immutable sha-<short> tag.
//
//          This pipeline only builds. Production deploys stay manual through
//          infra's deploy workflow (dashboard/all).
//
// Trigger: GitHub webhook push event on `main` (multibranch job created by
//          infra JCasC; branch filter ^main$, script path Jenkinsfile).
// Toolchain: Node 20 from the Jenkins image (/opt/node20).
// Env: NEXT_PUBLIC_BASE_URL is a global Jenkins env var defined by JCasC
//      (infra/stacks/jenkins/jenkins.yaml) and must equal the production API
//      origin, e.g. https://api.airlipay.com.
// Credentials: ghcr-write (usernamePassword: GHCR username + write:packages
//              token) — defined by JCasC in infra.
// =============================================================================
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        NODE_HOME = '/opt/node20/bin'
        IMAGE = 'ghcr.io/techarcgram-org/airlipay-dashboard'
        CI = 'true'
    }

    stages {
        stage('Install') {
            steps {
                sh '''
                    set -eu
                    export PATH="$NODE_HOME:$PATH"
                    node --version
                    npm --version
                    npm ci --no-audit --no-fund
                '''
            }
        }

        stage('Lint') {
            steps {
                sh '''
                    set -eu
                    export PATH="$NODE_HOME:$PATH"
                    npm run lint
                '''
            }
        }

        stage('Build and push image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'ghcr-write',
                    usernameVariable: 'GHCR_USER',
                    passwordVariable: 'GHCR_TOKEN'
                )]) {
                    sh '''
                        set -eu
                        IMAGE_TAG="sha-$(git rev-parse --short=7 HEAD)"
                        : "${NEXT_PUBLIC_BASE_URL:?NEXT_PUBLIC_BASE_URL must be set (JCasC global env)}"
                        echo "Building $IMAGE:$IMAGE_TAG with NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL"
                        docker build --pull \
                            --build-arg NEXT_PUBLIC_BASE_URL="$NEXT_PUBLIC_BASE_URL" \
                            -t "$IMAGE:$IMAGE_TAG" \
                            .
                        echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
                        docker push "$IMAGE:$IMAGE_TAG"
                        echo "Pushed $IMAGE:$IMAGE_TAG"
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
