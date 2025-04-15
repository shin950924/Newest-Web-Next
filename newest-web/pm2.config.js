// pm2.config.js
module.exports = {
  apps: [
    {
      name: "next-app", // PM2에서 보여질 앱 이름
      script: "node_modules/next/dist/bin/next", // Next.js 실행 스크립트
      args: "start -p 3000", // 포트 설정
      instances: "max", // CPU 코어 수만큼 클러스터 모드로 실행
      exec_mode: "cluster", // fork 대신 cluster 모드로 멀티 프로세스 실행
      watch: false, // 코드 변경 시 자동 재시작 (개발 환경에서는 true 가능)
      env: {
        NODE_ENV: "production", // 환경변수 설정
      },
    },
  ],
};