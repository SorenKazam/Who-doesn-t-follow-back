const list1 = document.getElementById("list1");
const list2 = document.getElementById("list2");
const buttonSubmit = document.getElementById("buttonSubmit");
const buttonReset = document.getElementById("buttonReset");
const alertSpan = document.getElementById("alertSpan");
const goTopBtn = document.getElementById("goTopBtn");
const resultsContainer = document.getElementById("resultsContainer");
const howWorkContainer = document.getElementById("instructionsContainer");
const howWorkBtn = document.getElementById("buttonHowWorks");

/* STRINGS STORAGE */
var Followers = "";
var Following = "";
var list1Value = "";
var list2Value = "";

/* ARRAYS STORAGE (FORMATED) */
var followersArray = [];
var followingArray = [];

/* ALERT SPAN SETTINGS */
function modifyAlertSpan(textValue, alertType) {
  switch (alertType) {
    case "success":
      alertSpan.style.backgroundColor = "#a2fc35";
      break;
    case "danger":
      alertSpan.style.backgroundColor = "#fc3535";
      break;
    case "alert":
      alertSpan.style.backgroundColor = "#fcf235";
      break;
  }
  alertSpan.style.display = "block";
  alertSpan.textContent = textValue;
}

/* HOW THE PAGE WORKS BUTTON */
howWorkBtn.addEventListener("click", () => {
  if (howWorkContainer.style.display == "none") {
    howWorkContainer.style.display = "flex";
    window.location.href = "#instructionsContainer";
    howWorkBtn.style.backgroundColor = "#ffc267";
  } else {
    howWorkContainer.style.display = "none";
    howWorkBtn.style.backgroundColor = "";
  }
});

/* GO TOP BUTTON */
goTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* RESET BUTTON */
buttonReset.addEventListener("click", () => {
  console.log("Reset button clicked");

  /* RESET if there is a preview table */
  resultsContainer.innerHTML = "";

  /* Reset the strings */
  Followers = "";
  Following = "";

  /* Delete lists input values */
  list1.value = "";
  list2.value = "";

  /* DEBBUG */
  console.log(`Followers: ${Followers} \nFollowing: ${Following}`);
  modifyAlertSpan("List reseted", "success");
});

/* SUBMIT BUTTON */
buttonSubmit.addEventListener("click", () => {
  console.log("Submit button clicked");

  list1Value = list1.value;
  list2Value = list2.value;

  /* Check if there is any information inside the lists */
  if (list1Value.length == 0) {
    console.log("List 1 empty");
    modifyAlertSpan("List 1 is empty", "alert");
    return;
  } else if (list2Value.length == 0) {
    console.log("List 2 empty");
    modifyAlertSpan("List 2 is empty", "alert");
    return;
  } else {
    console.log("There are values inside both lists");
    updateList(list1Value, list2Value);
  }
});

/* UPDATE LIST */
function updateList(list1Value, list2Value) {
  console.log("updateList function called");
  /* Reset preview list if clicked again*/
  Followers = ""; // reset followers
  Following = ""; // reset following

  /* Insert new values into the strings*/
  Followers = list1Value;
  Following = list2Value;

  /* Console log the strings list */
  console.log(
    `Values inside both lists\nFollowers:\n${Followers} \nFollowing:\n${Following}`
  );
  modifyAlertSpan("List updated", "success");

  /* Calling the divide function to filter the lists */
  divideStrings();
}

/* DIVIDER (going to get both strings lists, and format it and insert it into arrays) */
function divideStrings() {
  console.log("divideStrings function called");

  /* Suffixed is goin to be used to locate the line we need to manipulate!*/
  suffixed = "'s profile picture";

  /* RESET preview data */
  followersArray = [];
  followingArray = [];

  /* Grab the intire string and divide by the breaklines of the list, and store it inside the temporary array "x", "Y" is for the following list */
  var x = [];
  x = Followers.split("\n");
  var y = [];
  y = Following.split("\n");

  /* Verify if in each line of the list exists the suffixed! very important!! */
  x.forEach((line) => {
    if (line.includes(suffixed)) {
      /* If the suffixe exists, then we need this line!! so before adding it to the array, with the ig id, we need to remove first the suffixed from the line! this way we will have JUST the userID!! */
      id = line.replace(suffixed, "");

      /* INSERT new data */
      followersArray.push(id);
    }
  });

  y.forEach((line) => {
    if (line.includes(suffixed)) {
      /* If the suffixe exists, then we need this line!! so before adding it to the array, with the ig id, we need to remove first the suffixed from the line! this way we will have JUST the userID!! */
      id = line.replace(suffixed, "");

      /* INSERT new data */
      followingArray.push(id);
    }
  });

  console.log(followersArray);
  console.log(followingArray);

  /* VERIFY is there is ANY id inside the arrays lists! */
  if (followersArray.length == 0) {
    console.log("No followers found");
    modifyAlertSpan("No followers found", "danger");
    return;
  } else if (followingArray.length == 0) {
    console.log("No following found");
    modifyAlertSpan("No following found", "danger");
    return;
  } else {
    console.log("Both lists have values");
    compareLists();
  }
}

function compareLists() {
  console.log("Compare Lists called!");

  var existInBothLists = [];
  var onlyInList1 = [];
  var onlyInList2 = [];

  followersArray.forEach((item) => {
    if (followingArray.includes(item)) {
      existInBothLists.push(item);
    } else {
      onlyInList1.push(item);
    }
  });

  followingArray.forEach((item) => {
    if (!followersArray.includes(item)) {
      onlyInList2.push(item);
    }
  });

  console.log("Exists in both (mutual following)");
  console.log(existInBothLists);
  console.log("only in list 1 (I dont follow back!)");
  console.log(onlyInList1);
  console.log("only list 2 (NO follow back!)");
  console.log(onlyInList2);

  createTable(existInBothLists, onlyInList1, onlyInList2);
}

function createTable(existInBothLists, onlyInList1, onlyInList2) {
  console.log("Creating table with data");

  /* RESET if there is a preview table */
  resultsContainer.innerHTML = "";

  console.log("lists");
  console.log("mutual");
  console.log(existInBothLists);
  console.log("only list 1");
  console.log(onlyInList1);
  console.log("only list 2");
  console.log(onlyInList2);

  const tableHeaders = ["User", "You follow", "Follows back", "Result"];
  const igLink = "https://www.instagram.com/";

  /* Results container title */
  const ttitle = document.createElement("h2");
  ttitle.textContent = "Results";
  resultsContainer.appendChild(ttitle);

  /* Creating the table */
  const table = document.createElement("table");
  resultsContainer.appendChild(table);

  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");

  /* Table head */
  table.appendChild(thead);
  thead.appendChild(tr);
  tableHeaders.forEach((item) => {
    const th = document.createElement("th");
    th.textContent = item;
    tr.appendChild(th);
  });

  /* Table body */
  table.appendChild(tbody);

  /* Inserting people that follows back into the table list */
  existInBothLists.forEach((item) => {
    const tr = document.createElement("tr");
    tr.id = "mutual";
    tr.className = "mutual";
    /* user name */
    const td = document.createElement("td");
    const a = document.createElement("a");
    const profileLink = igLink.concat(item);
    a.textContent = item;
    a.setAttribute("href", profileLink);
    a.setAttribute("target", "_blank");
    td.appendChild(a);
    /* user following check */
    const td2 = document.createElement("td");
    td2.textContent = "✅";
    /* user follows back check */
    const td3 = document.createElement("td");
    td3.textContent = "✅";
    /* result */
    const td4 = document.createElement("td");
    td4.textContent = "Mutual";

    tbody.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
  });

  /* Inserting people that you dont follow back */
  onlyInList1.forEach((item) => {
    const tr = document.createElement("tr");
    tr.id = "youDontFollowBack";
    tr.className = "youDontFollowBack";
    /* user name */
    const td = document.createElement("td");
    const a = document.createElement("a");
    const profileLink = igLink.concat(item);
    a.textContent = item;
    a.setAttribute("href", profileLink);
    a.setAttribute("target", "_blank");
    td.appendChild(a);
    /* user following check */
    const td2 = document.createElement("td");
    td2.textContent = "❌";
    /* user follows back check */
    const td3 = document.createElement("td");
    td3.textContent = "✅";
    /* result */
    const td4 = document.createElement("td");
    td4.textContent = "You don't follow back!";

    tbody.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
  });

  /* Inserting people that dont follows you back */
  onlyInList2.forEach((item) => {
    const tr = document.createElement("tr");
    tr.id = "noFollowBack";
    tr.className = "noFollowBack";
    /* user name */
    const td = document.createElement("td");
    const a = document.createElement("a");
    const profileLink = igLink.concat(item);
    a.textContent = item;
    a.setAttribute("href", profileLink);
    a.setAttribute("target", "_blank");
    td.appendChild(a);
    /* user following check */
    const td2 = document.createElement("td");
    td2.textContent = "✅";
    /* user follows back check */
    const td3 = document.createElement("td");
    td3.textContent = "❌";
    /* result */
    const td4 = document.createElement("td");
    td4.textContent = "Don't follow you back";

    tbody.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
  });

  /* Scroll to table with results */
  window.location.href = "#resultsContainer";
}
