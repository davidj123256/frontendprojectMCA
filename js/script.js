let students;

// For Profile Page

function getProfileDetailsFromJSON() {
  fetch('./json/students.json')
    .then((response) => response.json())
    .then((json) => {
      students = JSON.parse(JSON.stringify(json)).students;
      getProfileDetails();
    })
}

function getProfileDetails() {

  // find the array of the current student

  for (i = 0; i < students.length; i++) {
    if (sessionStorage.getItem("studentId") == students[i].studentId) {
      currentStudentId = i;
      break;
    }
  }

  document.getElementById('studentPicture').src = students[currentStudentId].profilePicture
  document.getElementById('studentName').innerHTML = students[currentStudentId].fullname;
  document.getElementById('studentId').innerHTML = students[currentStudentId].studentId;
  document.getElementById('studentEmail').innerHTML = students[currentStudentId].email;
  document.getElementById('studentEmail').href = "mailto:" + students[currentStudentId].email;
  document.getElementById('studentMobile').innerHTML = students[currentStudentId].mobile;
  document.getElementById('bloodGroup').innerHTML = students[currentStudentId].bloodGroup;
  document.getElementById('grade').innerHTML = students[currentStudentId].grade;
  document.getElementById('fatherName').innerHTML = students[currentStudentId].father.name;
  document.getElementById('fatherEmail').innerHTML = students[currentStudentId].father.email;
  document.getElementById('fatherEmail').src = "mailto:" + students[currentStudentId].father.email;
  document.getElementById('fatherMobile').innerHTML = students[currentStudentId].father.mobile;
  document.getElementById('motherName').innerHTML = students[currentStudentId].mother.name;
  document.getElementById('motherEmail').innerHTML = students[currentStudentId].mother.email;
  document.getElementById('motherEmail').src = "mailto:" + students[currentStudentId].mother.email;
  document.getElementById('motherMobile').innerHTML = students[currentStudentId].mother.mobile;

}


// Function to display the mark based on a subject and accordingly calculate the grade

function getMarksFromJSON() {
  fetch('./json/students.json')
    .then((response) => response.json())
    .then((json) => {
      students = JSON.parse(JSON.stringify(json)).students;
      getMarksAndGrade();
    })
}



function getMarksAndGrade() {

  // find the array of the current student

  for (i = 0; i < students.length; i++) {
    if (sessionStorage.getItem("studentId") == students[i].studentId) {
      break;
    }
  }



  var selectedSub = document.getElementById("selectSub").value;
  let mark = document.getElementById("marks");

  if (selectedSub == "chemistry") {
    mark.value = students[i].marks.Chemistry;
  }
  else if (selectedSub == "computers") {
    mark.value = students[i].marks.Computers;
  }
  else if (selectedSub == "english") {
    mark.value = students[i].marks.English;
  }
  else if (selectedSub == "french") {
    mark.value = students[i].marks.French;
  }
  else if (selectedSub == "math") {
    mark.value = students[i].marks.Math;
  }
  else if (selectedSub == "physics") {
    mark.value = students[i].marks.Physics;
  }
  else {
    mark.value = null;
  }

  let grade = document.getElementById("grade");
  if (mark.value >= 90) {
    grade.value = "A+";
  } else if (mark.value >= 80) {
    grade.value = "A";
  } else if (mark.value >= 70) {
    grade.value = "B";
  } else if (mark.value >= 60) {
    grade.value = "C";
  } else if (mark.value >= 50) {
    grade.value = "D";
  } else if (mark.value < 50 && mark.value === null) {
    grade.value = "F";
  } else if (mark.value == "") {
    grade.value = null;
  }
}


// Login Scripts

function login() {

  fetch('./json/students.json')
    .then((response) => response.json())
    .then((json) => {
      students = JSON.parse(JSON.stringify(json)).students;
      callLogin()
    });
}

function callLogin() {

  sessionStorage.clear();

  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let matchFound = false;

  for (i = 0; i < students.length; i++) {
    if (user == students[i].username && pass == students[i].password) {
      // adds the username and ID value to the session storage
      sessionStorage.setItem('username', user);
      sessionStorage.setItem('studentId', students[i].studentId);

      // redirects to the welcome.html page
      window.location.href = "welcome.html";

      matchFound = true;

      break;

    }
  }
  if (!matchFound)
    document.getElementById("loginError").style.visibility = "visible";
}



function hideLoginError() {
  document.getElementById("loginError").style.visibility = "hidden";
}


// Extra Activities

function submitActivity() {
  let activityName = document.getElementById("activityName").value;
  let activityDetails = document.getElementById("activityDetails").value;

  if (activityName != "" && activityDetails != "") {
    sessionStorage.setItem(activityName, activityDetails);

    alert("The activity '" + activityName + "' has been added!")

    document.getElementById("activityName").value = ""
    document.getElementById("activityDetails").value = ""
  }
  else {
    document.getElementById("noActivityEntered").style.visibility = "visible";
  }
}

function hideActivityMessage() {
  document.getElementById("noActivityEntered").style.visibility = "hidden";
}


function listActivities() {

  if (sessionStorage.length > 3) {

    document.getElementById("noActivities").style.display = "none";

    for (i = 0; i < sessionStorage.length; i++) {

      if (sessionStorage.key(i) != "username" && sessionStorage.key(i) != "IsThisFirstTime_Log_From_LiveServer" && sessionStorage.key(i) != "studentId") {

        // Get currently iterated Activity Name & Details
        let currentKey = sessionStorage.key(i);

        currentActivityName = currentKey;
        currentActivityDetails = sessionStorage.getItem(currentKey);

        // Make a div for the elements that would be a part of this activity
        let newDiv = document.createElement("div");
        newDiv.id = currentActivityName + "div";
        newDiv.className = "d-flex my-4 border p-4 align-items-center";

        // Make a div just for the dt and dd
        let newSubDiv = document.createElement("div");
        newSubDiv.id = currentActivityName + "subDiv";

        // Make a dt and dd out of them
        let newDt = document.createElement("dt");
        newDt.innerHTML = currentActivityName

        let newDd = document.createElement("dd");
        newDd.innerHTML = currentActivityDetails;

        // Make a delete button
        let newDelete = document.createElement("i")
        newDelete.id = currentActivityName + "delete"
        newDelete.onclick = () => {
          alert("Successfully deleted the activity '" + newDelete.id.substring(0, newDelete.id.length - 6) + "'");
          sessionStorage.removeItem(newDelete.id.substring(0, newDelete.id.length - 6));
          location.reload();
        }
        newDelete.className = "fa-sharp fa-solid fa-trash fa-lg ms-auto";
        newDelete.style.cursor = "pointer";

        // Append them to listOfActivities
        document.getElementById("listOfActivities").appendChild(newDiv);
        document.getElementById(currentActivityName + "div").appendChild(newSubDiv);
        document.getElementById(currentActivityName + "subDiv").appendChild(newDt);
        document.getElementById(currentActivityName + "subDiv").appendChild(newDd);
        document.getElementById(currentActivityName + "div").appendChild(newDelete);


      }

    }

  }
}