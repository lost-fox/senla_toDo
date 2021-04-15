const todoInput = document.querySelector('#text');
const todoButton = document.querySelector('#task__button');
const todoList = document.querySelector('#list__Todo');

//добавление задачи

todoButton.addEventListener('click', (e) => {
   if (todoInput.value === '') return
   createElements (todoInput.value)
   todoInput.value = '';
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
      li.classList.toggle('checked')
   })

   todoList.prepend(divCase);
   divCase.appendChild(divButton);
   divButton.appendChild(buttonImportant);
   divButton.appendChild(buttonDelete);
   buttonDelete.appendChild(imgDelete);
   divCase.appendChild(li);
}

