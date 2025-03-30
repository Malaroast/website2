document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.getElementById("login-container");
    const mainContainer = document.getElementById("main-container");

    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const drawButton = document.getElementById("drawButton");

    // 저장된 로그인 정보 확인
    if (localStorage.getItem("loggedIn") === "true") {
        loginContainer.classList.add("hidden");
        mainContainer.classList.remove("hidden");
    }

    // 로그인 기능
    loginButton.addEventListener("click", function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email === "admin" && password === "admin") {
            localStorage.setItem("loggedIn", "true");
            loginContainer.classList.add("hidden");
            mainContainer.classList.remove("hidden");

            Swal.fire({
                title: "로그인 성공!",
                text: "이제 청소 당번을 추첨할 수 있습니다.",
                icon: "success",
                confirmButtonText: "확인"
            });

        } else {
            Swal.fire({
                title: "로그인 실패!",
                text: "이메일 또는 비밀번호가 올바르지 않습니다.",
                icon: "error",
                confirmButtonText: "다시 시도"
            });
        }
    });

    // 로그아웃 기능
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("loggedIn");
        loginContainer.classList.remove("hidden");
        mainContainer.classList.add("hidden");

        Swal.fire({
            title: "로그아웃 완료!",
            text: "다시 로그인해주세요.",
            icon: "info",
            confirmButtonText: "확인"
        });
    });

    // 청소 당번 추첨 기능
    drawButton.addEventListener("click", function () {
        let excludedNumbers = [3, 7, 15]; // 제외할 번호 설정
        let availableNumbers = [];

        // 제외할 번호를 뺀 1~25 범위의 숫자 리스트 생성
        for (let i = 1; i <= 25; i++) {
            if (!excludedNumbers.includes(i)) {
                availableNumbers.push(i);
            }
        }

        let selectedNumbers = [];
        while (selectedNumbers.length < 5) {
            let randomIndex = Math.floor(Math.random() * availableNumbers.length);
            let randomNum = availableNumbers[randomIndex];

            if (!selectedNumbers.includes(randomNum)) {
                selectedNumbers.push(randomNum);
            }
        }

        // SweetAlert2로 결과 표시
        Swal.fire({
            title: "청소 당번 당첨!",
            text: `당번 번호: ${selectedNumbers.join(", ")}`,
            icon: "success",
            confirmButtonText: "확인",
            background: "#fefefe",
            color: "#333",
            confirmButtonColor: "#007bff"
        });
    });
});
