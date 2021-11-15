let TC = document.querySelector(".ticket-container"); //queryselector is js selector
let allFilters = document.querySelectorAll(".filter");

let modalVisible = false;

function loadTickets(color) {
  let allTasks = localStorage.getItem("allTasks");

  if (allTasks != null) {
    allTasks = JSON.parse(allTasks);
    if (color) {
      allTasks = allTasks.filter(function (data) {
        return data.priority == color;
      });
    }
    for (let i = 0; i < allTasks.length; i++) {
      let ticket = document.createElement("div");
      // let id = uid();
      ticket.classList.add("ticket");
      ticket.innerHTML = `<div class="ticket-color ticket-color-${allTasks[i].priority}"></div>
                            <div class="ticket-id">#${allTasks[i].ticketId}</div>
                            <div class="task">${allTasks[i].task}</div>`; //idhr hmne ticket bnai hai

      // TC.innerHTML = TC.innerHTML + ticket;
      TC.appendChild(ticket);
      ticket.addEventListener("click", function (e) {
        if (e.currentTarget.classList.contains("active")) {
          e.currentTarget.classList.remove("active"); //agar active class kisi ticket pr to remove krege or agara nhai h toh add krege
          console.log(e.currentTarget);
          //idhr doubt h
        } else {
          e.currentTarget.classList.add("active");
        }
      });
    }
  }
}
loadTickets();

for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", filterHandler);
}
function filterHandler(e) {
  //  let span = e.currentTarget.children[0];
  // let style = getComputedStyle(span);  //getComputedStyle ise hm sari css property fetch kr skte h
  // // console.log(style);
  //  TC.style.backgroundColor = style.backgroundColor;  //for colors background change
  
  TC.innerHTML = "";

  if (e.currentTarget.classList.contains("active")) {
    e.currentTarget.classList.remove("active");
  } else {
    let activeFilter = document.querySelector(".filter.active");
    if (activeFilter) {
      activeFilter.classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    let ticketPriority = e.currentTarget.children[0].classList[0].split("-")[0];
    loadTickets(ticketPriority);
  }
}
let addbtn = document.querySelector(".add");
let deleteBtn = document.querySelector(".delete");

deleteBtn.addEventListener("click", function (e) {
  let selectedTickets = document.querySelectorAll(".ticket.active");
  let allTasks = JSON.parse(localStorage.getItem("allTasks"));
  for (let i = 0; i < selectedTickets.length; i++) {
    selectedTickets[i].remove(); //yeh ham khud html se remove krre h

    let ticketID = selectedTickets[i].querySelector(".ticket-id").innerText;
    allTasks = allTasks.filter(function (data) {
      return "#" + data.ticketId != ticketID;
    });
  }
  localStorage.setItem("allTasks", JSON.stringify(allTasks)); //idhr local storage se remove krdi
});

addbtn.addEventListener("click", showModal);

let selectedPriority;
function showModal(e) {
  if (!modalVisible) {
    //1st way
    //     let modal = document.createElement("div");
    //     modal.classList.add("modal")
    //     modal.innerHTML = `<div class="task-to-be-typed" contenteditable="true"></div>
    //                         <div class="modal-prority-list">
    //                             <div class="modal-pink-filter modal-filter"></div>
    //                             <div class="modal-blue-filter modal-filter"></div>
    //                             <div class="modal-yellow-filter modal-filter"></div>
    //                             <div class="modal-green-filter modal-filter"></div>
    //                         </div>
    //                     </div> `;
    // TC.appendChild(modal);
    // modalVisible = true;

    //2nd way
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `<div class="task-to-be-typed" contenteditable="true" data-type="false"> Enter Your Task</div>
                       <div class="modal-prority-list">
                        <div class="modal-pink-filter modal-filter active"></div>
                        <div class="modal-blue-filter modal-filter"></div>
                        <div class="modal-yellow-filter modal-filter"></div>
                        <div class="modal-green-filter modal-filter"></div>
                       </div> `;
    // TC.innerHTML = TC.innerHTML + modal;
    TC.appendChild(modal);

    selectedPriority = "pink";
    let taskModal = document.querySelector(".task-to-be-typed");
    taskModal.addEventListener("click", function (e) {
      if (e.currentTarget.getAttribute("data-type") == "false") {
        //idr class ke aage . ni lgate
        e.currentTarget.innerText = "";
        e.currentTarget.setAttribute("data-type", "true");
      }
    });
    modalVisible = true;
    taskModal.addEventListener("keypress", addTicket.bind(this, taskModal));
    // console.log(fetchedModal);

    let modalFilter = document.querySelectorAll(".modal-filter"); //coz jo btn h unpr ik common class h modal filetr to vo li h
    for (let i = 0; i < modalFilter.length; i++) {
      modalFilter[i].addEventListener("click", selectPriority.bind(this,taskModal)); //calback function
    }
  }
}
function selectPriority(taskModal ,e) {
  //sbse pehle bydefault pink select h usko remove krege
  let activeFilter = document.querySelector(".modal-filter.active");
  activeFilter.classList.remove("active");
  selectedPriority = e.currentTarget.classList[0].split("-")[1]; //selected priority update kri h

  //ab remove krke jidr click kra h udr lgaenge
  e.currentTarget.classList.add("active");
  taskModal.click();
  taskModal.focus();
}

function addTicket(taskModal, e) {
  if (
    e.key == "Enter" &&
    e.shiftKey == false &&
    taskModal.innerText.trim() != ""
  ) {
    let task = taskModal.innerText;
    let ticket = document.createElement("div");
    let id = uid();
    // ticket.classList.add("ticket");
    // ticket.innerHTML = `<div class="ticket-color ticket-color-${selectedPriority}"></div>
    //                             <div class="ticket-id">#${id}</div>
    //                             <div class="task">${task}</div>`; //idhr hmne ticket bnai hai

    // TC.innerHTML = TC.innerHTML + ticket;
    document.querySelector(".modal").remove();
    modalVisible = false;
    // TC.appendChild(ticket);
    // ticket.addEventListener("click", function (e) {
    //   if (e.currentTarget.classList.contains("active")) {
    //     e.currentTarget.classList.remove("active"); //agar active class kisi ticket pr to remove krege or agara nhai h toh add krege
    //     console.log(e.currentTarget);
    //     //idhr doubt h
    //   } else {
    //     e.currentTarget.classList.add("active");
    //   }
    // });   //idhr html se add krre the to ab hum local storage se load krege

    //  local STORAGE
  //  let allTasks = localStorage.getItem("allTasks");

    // if (allTasks == null) {
    //   let data = [{ "ticketId": id, "task": task, "priority": selectedPriority }];
    //   localStorage.setItem("allTasks", JSON.stringify(data));
    // } else {
    //   let data = JSON.parse(allTasks);
    //   data.push({ "ticketId": id, "task": task, "priority": selectedPriority });
    //   localStorage.setItem("allTasks", JSON.stringify(data));
    // }
    let allTasks = localStorage.getItem("allTasks");       //repeat above code

    if(allTasks == null) {
        let data = [{"ticketId": id, "task": task, "priority": selectedPriority}];
        localStorage.setItem("allTasks", JSON.stringify(data));
    } else {
        let data = JSON.parse(allTasks);
        data.push({"ticketId": id, "task": task, "priority": selectedPriority});
        localStorage.setItem("allTasks", JSON.stringify(data));
    }

    let activeFilter = document.querySelector(".filter.active");
    TC.innerHTML = "";
    if(activeFilter){
      let priority = activeFilter.children[0].classList[0].split("-")[0];
      loadTickets(priority);
    } else {
      loadTickets();
    }

  } else if (e.key == "Enter" && e.shiftKey == false) {
    e.preventDefault();
    alert("ERROR!! - you have not type your text");
  }
}
