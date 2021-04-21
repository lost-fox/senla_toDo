const todoInput = document.querySelector('#text');
const todoButton = document.querySelector('#task__button');
const todoList = document.querySelector('#list__Todo');
const todoSearch = document.querySelector('#search');


let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoElements = [];



//создание структуры задачи

const createElements = (task, index) => {
   return `
   <div class = "case ${task.completed ? 'checked' : ''} ">
      <div class = "case__button">
         <button  onclick = "importantTask(${index})" class= "important__button ${task.important ? 'important' : 'not--important'}"></button>
         <button  onclick = "deleteTask(${index})"  class = "delete__button">
            <img src = "../image/delete.png">
         </button> 
      </div>
      <li onclick = "completeTask(${index})" class = "${task.important ? 'important' : 'not--important'}"   ${task.completed ? 'checked' : ''}>${task.description}</li>
   </div>
   `
}

// добавление всех задач на экран

const fillHtmlList = () => {
   todoList.innerHTML = "";
   if (tasks.length > 0){
      tasks.forEach((item, index) => {
         todoList.innerHTML += createElements(item, index);
      });

      todoElements = document.querySelectorAll('.case');
      
   }
}

fillHtmlList();

// добавление localStorage
const updateLocal = () =>{
   localStorage.setItem('tasks', JSON.stringify(tasks))
}

// отмечаем выполненную задачу 
const completeTask = index =>{
   tasks[index].completed = !tasks[index].completed;
   if (tasks[index].completed){
       todoElements[index].classList.add('checked');
   } else {
      todoElements[index].classList.remove('checked');
   }
   updateLocal();
   fillHtmlList();
}

// удаляем задачу

const deleteTask = index =>{
   tasks.splice(index,1);
   updateLocal();
   fillHtmlList();
}

// важная задача

const importantTask = index =>{
   tasks[index].important = !tasks[index].important;


   updateLocal();
   fillHtmlList();
}

//создание задачи
function Task(description){
   this.description = description;
   this. completed = false;
   this. important = false;
}

//добавление задачи

todoButton.addEventListener('click', (e) => {
   tasks.unshift(new Task(todoInput.value));
    
   updateLocal();
   fillHtmlList();

   todoInput.value = '';
});

// добавление задачи по enter

todoInput.addEventListener('keyup', function (e){
   if (e.keyCode === 13){
   tasks.unshift(new Task(todoInput.value));
   updateLocal();
   fillHtmlList();

   todoInput.value = '';
   }
} )

// живой поиск

todoSearch.oninput = function(){
   let value = this.value.trim();
   let list = document.querySelectorAll ('.case');

   if (value != ''){
      list.forEach (elem => {
         if(elem.innerText.search(value) == -1){
            elem.classList.add('hide');
         }
      });
   } 
  else {
      list.forEach(elem => {
         elem.classList.remove('hide');
      })
   }

   console.log (list);

}

// переключение по вкладкам

let tab = function(){
   let tabNav = document.querySelectorAll('.components');
      // tabContent = document.querySelectorAll('.')
   let tabName;

      tabNav.forEach(item =>{
         item.addEventListener('click', selectTabNav)
      });

      function selectTabNav(){
         tabNav.forEach(item =>{
            item.classList.remove('is-active');
         });
         this.classList.add('is-active');
         tabName = this.getAttribute('data-tab-name');
        selectTabContent (tabName);
        //console.log (tabName);
      }

      function selectTabContent (tabName){
         let list = document.querySelectorAll ('.case');
         switch (tabName){
            case 'tab-1':  
            list.forEach(item =>{
               item.classList.remove('tab');
            });
            break;
            case 'tab-2':  
            list.forEach(item =>{
               item.classList.remove('tab');
               if (item.className.indexOf("checked") !== -1){
                  item.classList.add('tab');
               }
            });
            break;
            case 'tab-3':  
            list.forEach(item =>{
               item.classList.remove('tab');
               if (item.className.indexOf("checked") == -1){
                  item.classList.add('tab');
               }
            });
            break;
         }
      }    
};

tab();