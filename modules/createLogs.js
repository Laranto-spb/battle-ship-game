const logsList = document.getElementById("messages-list");

export const createLogs = (text, attempts) => {
  if (text) {
    const listItem = document.createElement("li");
    listItem.classList.add = "list-group-item";
    listItem.innerText = `${attempts ? attempts : "free attempt"} : ${text}`;
    logsList.prepend(listItem);
  }
};
