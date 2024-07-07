// 유저가 값을 입력한다
// + 버튼을 클릭하면 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝가면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 false -> true
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남 탭은 끝난 아이템만 , 진행중은 진행중만 나온다
// 전체 탭을 누르면 다시 전체로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);

// enter 눌렀을 때  addTask 실행
taskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

// tabs에 클릭 이벤트 주기
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);
  taskInput.value = "";
  render();
  console.log(taskList);
}

function render() {
  let resultHTML = "";
  let list = [];

  if (mode === "all") {
    list = taskList;
  } else {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
                <div class ="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick = "toggleComplete('${list[i].id}')">Check</button>
                    <button onclick = "deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`;
    } else {
      resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick = "toggleComplete('${list[i].id}')">Check</button>
                    <button onclick = "deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  // filterList 비워주기
  filterList = [];

  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();

  console.log(filterList);
}

// 랜덤아이디 생성하기
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
