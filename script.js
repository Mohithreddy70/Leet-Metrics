document.addEventListener("DOMContentLoaded",function(){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");
    
function validateusername(username) {
    if (username.trim() === "") {
        alert("Username should not be empty");
        return false;
    }

    const regex = /^[a-zA-Z0-9 _\-]{1,15}$/;
    const isMatching = regex.test(username);

    if (!isMatching) {
        alert("Username not matching");
    }

    return isMatching;
}



async function fetchUserDetails(username) {
    try {
        searchButton.textContent = "Searching...";
        searchButton.disabled = true;

        const response = await fetch(
            `https://leetcode-stats-api.herokuapp.com/${username}`
        );

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();
        console.log(data);
        displayuserData(data);

    } catch (error) {
        console.error(error);
        statsContainer.innerHTML = "<p>NO DATA FOUND</p>";
    } finally {
        searchButton.disabled = false;
        searchButton.textContent = "Search";
    }
    
}

    
    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayuserData(data){
     const totalSolved = data.totalSolved;
     const easySolved=data.easySolved;
     const hardSolved=data.mediumSolved;
     const mediumSolved=data.mediumSolved;
     const totalEasy=data.totalEasy;
     const totalMedium=data.totalMedium;
     const totalHard=data.totalHard;

      console.log(totalSolved);
      updateProgress(easySolved,totalEasy,easyLabel,easyProgressCircle);
      updateProgress(mediumSolved,totalMedium,mediumLabel,mediumProgressCircle);
      updateProgress(hardSolved,totalHard,hardLabel,hardProgressCircle);
    const cardsData=[
        {label:"Overall Submissions",value:data.totalSolved},
        {label:"Overall Easy Submissions",value:data.easySolved},
        {label:"Overall Medium Submissions",value:data.mediumSolved},
        {label:"Overall Hard Submissions",value:data.mediumSolved}
    ]
      cardStatsContainer.innerHTML = cardsData.map(
            data => 
                    `<div class="card">
                    <h4>${data.label}</h4>
                    <p>${data.value}</p>
                    </div>`
        ).join("")
    
    }






    searchButton.addEventListener('click',function(){
        const username=usernameInput.value;
        if(validateusername(username))
        {
            fetchUserDetails(username);
        }
        else
        {
            alert("User Name not valid");
        }

    })
})