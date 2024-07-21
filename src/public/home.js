document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("updateNumForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // 폼의 기본 동작을 막음

      const newnum = document.getElementById("SerialNum").value;
      const loginId = sessionStorage.getItem("loginId"); // 세션 스토리지에서 로그인 ID를 가져옴

      const num = parseInt(newnum);

      if (!loginId) {
        alert("로그인 상태를 확인할 수 없습니다. 다시 로그인 해 주세요.");
        return;
      }

      const updateData = {
        loginId: loginId,
        num: num,
      };

      fetch("http://localhost:8080/member/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.num === num) {
            alert("num 필드 수정 성공!");
          } else {
            alert("num 필드 수정 실패: ");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("오류가 발생했습니다. 다시 시도해 주세요.");
        });
    });
});
