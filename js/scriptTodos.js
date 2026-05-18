'use strict';

// Page todos

const todos = document.querySelector('.todos');
const todoContainer = document.querySelector('.todo');
const todoFilter = document.querySelector('.filter-box');
const btnCompleted = document.querySelector('.todo-completed');
const btnUncompleted = document.querySelector('.todo-uncompleted');
const btnClearFilter = document.querySelector('.todo-clear-filter');

btnCompleted.addEventListener('click', function (e) {
  e.preventDefault();
  const todoCard = document.querySelectorAll('.todo-card');
  if (todoCard.length > 0) {
    todoCard.forEach((element, i) => {
      const todoInProgressElement = element.querySelector(
        '.todo-status-in-progress',
      );

      if (todoInProgressElement) {
        element.style.display = 'none';
      } else {
        element.style.display = 'flex';
      }
      btnClearFilter.style.display = 'flex';
    });
  } else console.error(`${err}`);
});

btnUncompleted.addEventListener('click', function (e) {
  e.preventDefault();
  const todoCard = document.querySelectorAll('.todo-card');
  if (todoCard.length > 0) {
    todoCard.forEach((element, i) => {
      // console.log(element);
      const todoCompletedElement = element.querySelector(
        '.todo-status-completed',
      );

      if (todoCompletedElement) {
        // element.style.opacity = 0;
        element.style.display = 'none';
      } else {
        element.style.display = 'flex';
      }
      // console.log(todoCard);
      btnClearFilter.style.display = 'flex';
    });
  } else console.error(`${err}`);
});

btnClearFilter.addEventListener('click', function (e) {
  e.preventDefault();
  const todoCard = document.querySelectorAll('.todo-card');
  if (todoCard.length > 0) {
    todoCard.forEach((element, i) => {
      const todoClearFilterElement =
        element.querySelector('.todo-clear-filter');
      element.style.display = 'flex';
      btnClearFilter.style.display = 'none';
    });
  } else console.error(`${err}`);
});

const getTodos = async function () {
  try {
    const resTodos = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!resTodos.ok) throw new Error('Problem getting todos data');
    const dataTodos = await resTodos.json();
    for (let i = 0; i < 12; i++) {
      let iconTodos = dataTodos[i].completed === true ? 'checked' : 'unchecked';
      let statusTodos =
        dataTodos[i].completed === true ? 'Completed' : 'In Progress';
      let textTodos =
        dataTodos[i].completed === true ? 'todo-text-completed' : '';
      let statusTodosCSS =
        dataTodos[i].completed === true
          ? 'todo-status-completed'
          : 'todo-status-in-progress';

      const html = `
                  <div class="todo-card">
                  <img
                    class="todo-icon"
                    src="assets/icon/${iconTodos}.png"
                  />
                  <div class="todo-content">
                    <h3 class="todo-text ${textTodos}">${dataTodos[i].title}</h3>
                    <p class="todo-status ${statusTodosCSS}">${statusTodos}</p>
                  </div>
      `;
      todoContainer.insertAdjacentHTML('beforeend', html);
    }
    return dataTodos;
  } catch (err) {
    console.error(`${err}`);
  }
};

getTodos();
