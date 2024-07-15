const express = require('express'); /*require 함수를 사용하여 Express와 Node.js의 기본 경로(path) 모듈을 가져옵니다. */
const path = require('path'); /*Express는 Node.js의 웹 애플리케이션 프레임워크로, HTTP 요청과 응답을 처리하는 강력한 기능을 제공합니다.
                                path 모듈은 파일 및 디렉터리 경로 관리에 사용됩니다. */
const app = express(); /*express() 함수를 호출하여 새로운 Express 애플리케이션 객체를 생성합니다. */
const port = 3000; // 프론트엔드 서버 포트

app.use(express.static(path.join(__dirname, 'public'))); /* path.join(__dirname, 'public')을 통해 현재 스크립트가 위치한 디렉터리에 있는 'public' 디렉터리의 경로를 지정합니다. */
                                                         /*이렇게 설정하면 /public 경로로 들어오는 모든 요청에 대해 해당 디렉터리의 정적 파일을 제공합니다.*/
app.get('/', (req, res) => { /*HTTP GET 요청에 대한 라우터를 설정합니다. / 경로에 접근하면 실행됩니다. */
    res.sendFile(path.join(__dirname, 'public', 'login.html')); /*res.sendFile(path.join(__dirname, 'public', 'login.html'))을 사용하여 클라이언트에게 'login.html' 파일을 전송합니다.
    path.join(__dirname, 'public', 'login.html')은 현재 스크립트가 있는 디렉터리에서 'public/login.html' 파일의 절대 경로를 생성합니다. */    
});

app.listen(port, () => { /*app.listen을 호출하여 Express 애플리케이션을 지정된 포트에서 실행합니다.
서버가 시작되면 콘솔에 Frontend server is running at http://localhost:3000와 같은 메시지가 표시됩니다.*/
    console.log(`Frontend server is running at http://localhost:${port}`);
});