let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const saveTabBtn = document.getElementById("save-tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const listEl = document.getElementById("list-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow : true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []    
    renderLeads(myLeads)
})

function renderLeads(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href='${leads[i]}' target=_blank>
                ${leads[i]}
            </a>
        </li>`
    }
    listEl.innerHTML = listItems
}