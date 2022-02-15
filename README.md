# :two_men_holding_hands: PJmoa-Server
- 프로젝트를 하고 싶은 사람들을 매칭해주는 서비스입니다.
- NodeJs(express) -> NestJs Refactoring

- Commit Message
```
Add : 파일추가
Update : 파일내용 변경
Delete : 파일 삭제
```

### :file_folder: 디렉토리 구조
```bash
📂 src
  └── 📂 config 
  └── 📂 user 
      └── 📂 dto
      └── 📂 repository
      ├── 📄user.controller.ts
      ├── 📄user.module.ts
      ├── 📄user.service.ts
      ├── 📄user.entity.ts
  └── 📂 notice
      └── 📂 dto
      └── 📂 repository
      ├── 📄notice.controller.ts
      ├── 📄notice.module.ts
      ├── 📄notice.service.ts
      ├── 📄notice.entity.ts
  └── 📂 project
      └── 📂 dto
      └── 📂 repository
      ├── 📄project.controller.ts
      ├── 📄project.module.ts
      ├── 📄project.service.ts
  └── 📂 entities
      └── 📂 notice 
          ├── 📄notice.entity.ts
      └── 📂 project 
          ├── 📄project.entity.ts
          ├── 📄projectLike.entity.ts
      └── 📂 user
          ├── 📄user.entity.ts
  📄 main.ts
  📄 app.module.ts
  📄 app.utils.ts
📂 test
📄 .gitignore
📄 .env.dev
📄 .env.prod
📄 README.md
```

<!-- #### :wrench: 디렉토리 별 담당 기능
- Route : 라우팅 처리, 서버와 클라이언트의 통신을 위한 인터페이스를 제공
- Controller : req, res
- Provider : CRUD 의 R(ead)
- Service : CRUD 의 CUD
- Dao : Query -->

### :bar_chart: ERD 설계
#### 유료전환으로 접속불가
- [AqueryTool Link](https://aquerytool.com/aquerymain/index/?rurl=7bbc63c9-b206-419f-ba05-39173e45127b)
  
![1](https://user-images.githubusercontent.com/63203480/131827315-68f1a5ef-d660-4e63-9726-4710650b0520.PNG)


### :clipboard: Architecture
![아키텍처](https://user-images.githubusercontent.com/63203480/122184639-613af680-cec7-11eb-8cd1-d99b8c7a70d1.PNG)

### :clipboard: env 파일
```
.env.dev  : 테스트 서버, DB 에 반영되는 환경 변수들
.env.prod : 실제 서버, DB 에 반영되는 환경 변수들
```
#### .env
```
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
DB_CONNECTION_LIMIT=
SERVER_PORT=
```