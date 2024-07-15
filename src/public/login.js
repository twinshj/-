document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // 폼의 기본 동작을 막음

      const loginId = document.getElementById("loginId").value;
      const password = document.getElementById("password").value;

      const loginData = {
        loginId: loginId,
        password: password,
      };

      fetch("http://localhost:8080/member/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "로그인 성공") {
            // 로그인 성공 처리
            alert("Login successful!");
            window.location.href = "/home.html"; // 예시로 대시보드 페이지로 이동
          } else {
            // 로그인 실패 처리
            alert("Login failed: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
    });
});
