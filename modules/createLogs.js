const logsList = document.getElementById('messages-list')

export const createLogs = (text) => {
    if (text) {
       const listItem = document.createElement('li'); 
       listItem.innerText = text;
       logsList.append(listItem);
    }
}