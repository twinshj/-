document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 폼의 기본 동작을 막음

    const username = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const loginId = document.getElementById("loginId").value;
    const phone1 = document.getElementById("phone1").value;
    const phone2 = document.getElementById("phone2").value;

    const registerData = {
      name: username,
      loginId: loginId,
      password: password,
      ownPhone: phone1,
      parentsPhone: phone2,
      email: email,
    };

    fetch("http://localhost:8080/member/sign-up", {
      // 백엔드 서버 주소
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "회원가입 성공") {
          // 회원가입 성공 처리
          alert("회원가입 성공!");
          window.location.href = "/login.html"; // 로그인 페이지로 이동
        } else {
          // 회원가입 실패 처리
          alert("회원가입 실패 ㅠ: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("에러 발생!");
      });
  });
