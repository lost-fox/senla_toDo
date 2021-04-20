const todoInput = document.querySelector('#text');
const todoButton = document.querySelector('#task__button');
const todoList = document.querySelector('#list__Todo');
const filterOption = document.querySelector('#filter-todo');

// добавление localStorage
let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

const fillHtmlList = () => {
   todoList.innerHTML = "";
   if (tasks.length > 0){
      tasks.forEach((item) => {
         todoList.innerHTML += createElements(item);
      })
   }
}

const updateLocal = () =>{
   localStorage.setItem('tasks', JSON.stringify(tasks))
}

function Task(description){
   this.description = description;
   this. completed = false;
}

//добавление задачи

todoButton.addEventListener('click', (e) => {
   if (todoInput.value === '') return
   tasks.push(new Task(todoInput.value))
   createElements (todoInput.value)
   todoInput.value = '';
  
   updateLocal();
   //fillHtmlList();
})

function createElements (value){
   const divCase = document.createElement('div');
   divCase.classList.add('case');

   const divButton = document.createElement('div');
   divButton.classList.add('case__button');

   const buttonImportant = document.createElement('button');
   buttonImportant.classList.add('important__button');
   buttonImportant.textContent = 'MARK IMPORTANT';

   buttonImportant.addEventListener('click', (e) =>{
      li.classList.toggle('important');
      buttonImportant.classList.toggle('not--important');
     

      if(document.querySelector('.important__button').classList.contains('not--important')){
          buttonImportant.textContent = 'NOT IMPORTANT';
         
      } else{
         buttonImportant.textContent = 'MARK IMPORTANT';
        
      }
     
     
   })

   const buttonDelete = document.createElement('button');
   buttonDelete.classList.add('delete__button');

   buttonDelete.addEventListener('click', (e) => {
      todoList.removeChild(divCase);
      
   })

   const imgDelete = document.createElement('img');
   imgDelete.src = '../image/delete.png';

   
   const li = document.createElement('li');
   li.textContent = value;

   li.addEventListener('click',(e) =>{
      li.classList.toggle('checked');
     
   })

   todoList.prepend(divCase);
   divCase.appendChild(divButton);
   divButton.appendChild(buttonImportant);
   divButton.appendChild(buttonDelete);
   buttonDelete.appendChild(imgDelete);
   divCase.appendChild(li);

   
}

filterOption.addEventListener ('click', filterTodo);

// фильтр задач 

function filterTodo (e){
 const todos = todoList.childNodes;
 todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
         break;
      case "active":
         if (todo.classList.contains('active')) {
            todo.style.display = "checked";
         }  else{
            todo.style.display = "none";
         }
    }
 });
}