function validatePasswords() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMessage = document.getElementById('password-error');
  if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match. Please try again.";
      errorMessage.style.display = "block"; // Show the error message
      return false; // Prevent form submission
  }

  errorMessage.style.display = "none"; // Hide the error message if passwords match
  return true; // Allow form submission
}
function checkPasswordStrength(password) {
  const strengthLevel = document.getElementById('strength-level');

  if (password.length < 8) {
      strengthLevel.textContent = "Weak";
      strengthLevel.style.color = "red";
  } else if (/[A-Za-z]/.test(password) && /\d/.test(password)) {
      strengthLevel.textContent = "Medium";
      strengthLevel.style.color = "orange";
  } else if (/[A-Za-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      strengthLevel.textContent = "Strong";
      strengthLevel.style.color = "green";
  } else {
      strengthLevel.textContent = "Weak";
      strengthLevel.style.color = "red";
  }
}

document.getElementById('password').addEventListener('input', function () {
  checkPasswordStrength(this.value);
});
function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from immediately submitting

  // Validate passwords
  if (!validatePasswords()) {
      return; // Stop form submission if passwords don't match
  }

  const registerButton = document.getElementById('register-button');
  const loadingIndicator = document.getElementById('loadingIndicator');

  // Hide the register button and show the spinner
  registerButton.style.display = 'none';
  loadingIndicator.style.display = 'block';

  // Wait for 3 seconds, then submit the form
  setTimeout(() => {
      alert("Form would be submitted here!");
      // Uncomment the next line to actually submit the form when the backend is ready
      // event.target.submit();
  }, 3000);
}

document.querySelectorAll('#toggle-password, #toggle-confirm-password').forEach(button => {
  button.addEventListener('click', (e) => {
      const input = e.target.previousElementSibling;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      e.target.textContent = isPassword ? '🙈' : '👁️'; // Update the icon
  });
}); 


// Attach the handleSubmit function to the form's submit event
document.querySelector('form').addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const modal = document.getElementById('task-modal');
    const floatingButton = document.querySelector('.floating-button');
    const themeToggle = document.getElementById('theme-toggle');
    const editTaskForm = document.getElementById('edit-task-form');
    const taskList = document.getElementById('task-list');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    // Load the pop sound
const popSound = new Audio('sounds/pop.mp3');

// Play the sound
function playPopSound() {
  popSound.play();
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', function () {
  // Complete Task
  document.querySelectorAll('.complete-btn').forEach(button => {
    button.addEventListener('click', function () {
      playPopSound();
      // Your existing complete task logic
    });
  });

  // Delete Task
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function () {
      playPopSound();
      // Your existing delete task logic
    });
  });

  // Edit Task
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function () {
      playPopSound();
      // Your existing edit task logic
    });
  });

  // Toggle Important Task
  document.querySelectorAll('.star-btn').forEach(button => {
    button.addEventListener('click', function () {
      playPopSound();
      // Your existing toggle important logic
    });
  });
});
  
    // Add Task Form Submission
    if (taskForm) {
      taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(taskForm);
        fetch('/add', {
          method: 'POST',
          body: formData
        }).then(response => response.json()).then(data => {
          if (data.message === 'Task added successfully') {
            window.location.reload();
          }
        });
      });
    }
  
    // Edit Task Form Submission
    if (editTaskForm) {
      editTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(editTaskForm);
        const taskId = editTaskForm.getAttribute('action').split('/').pop();
        fetch(`/edit/${taskId}`, {
          method: 'POST',
          body: formData
        }).then(response => response.json()).then(() => {
          window.location.href = '/';
        });
      });
    }
  
    // Complete Task
    document.querySelectorAll('.complete-task').forEach(button => {
      button.addEventListener('click', function () {
        const taskId = this.dataset.id;
        fetch(`/update/${taskId}`, {
          method: 'POST'
        }).then(response => response.json()).then(data => {
          if (data.message === 'Task status updated') {
            window.location.reload();
          }
        });
      });
    });
  
    // Delete Task
    document.querySelectorAll('.delete-task').forEach(button => {
      button.addEventListener('click', function () {
        const taskId = this.dataset.id;
        fetch(`/delete/${taskId}`, {
          method: 'DELETE'
        }).then(response => response.json()).then(data => {
          if (data.message === 'Task deleted') {
            window.location.reload();
          }
        });
      });
    });
  
    // Floating Button to Toggle Modal
    if (floatingButton && modal) {
      floatingButton.addEventListener('click', function () {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
        floatingButton.classList.toggle('rotate');
      });
  
      // Close Modal on Click Outside
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = 'none';
          floatingButton.classList.remove('rotate');
        }
      };
    }
  
    // Toggle Dark Mode
    if (themeToggle) {
      function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        themeToggle.classList.toggle('rotated');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
      }
  
      themeToggle.addEventListener('click', toggleTheme);
  
      // Apply dark mode from localStorage if previously set
      if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.classList.add('rotated');
      }
    }
  
    // Toggle Sidebar
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', function () {
        const toggleIcon = this;
        sidebar.classList.toggle('active');
        toggleIcon.classList.toggle('active');
        toggleIcon.textContent = sidebar.classList.contains('active') ? '×' : '☰';
      });
  
      // Close Sidebar on Click Outside
      document.addEventListener('click', function (event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
          sidebar.classList.remove('active');
          sidebarToggle.textContent = '☰';
        }
      });
    }
  
    // Load Important Tasks
    if (taskList) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const importantTasks = tasks.filter(task => task.important);
  
      if (importantTasks.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No important tasks found.';
        taskList.appendChild(li);
      } else {
        importantTasks.forEach(task => {
          const li = document.createElement('li');
          li.className = 'task';
          li.dataset.id = task.id; // Ensure each task has a unique ID
          li.innerHTML = `
            <div class="task-content">
              <span>${task.task}</span>
              <div class="task-actions">
                <button class="btn edit-btn"><i class="fas fa-edit"></i></button>
                <button class="btn delete-btn"><i class="fas fa-trash"></i></button>
                <button class="btn complete-btn"><i class="fas fa-check"></i></button>
                <button class="btn star-btn" onclick="toggleImportant(this)">
                  <i class="${task.important ? 'fas' : 'far'} fa-star ${task.important ? 'gold' : ''}"></i>
                </button>
              </div>
            </div>
          `;
          taskList.appendChild(li);
        });
      }
    }
  });
  
  // Toggle Important Task
  function toggleImportant(starButton) {
    const starIcon = starButton.querySelector('i');
    const task = starButton.closest('.task');
    const taskId = task.dataset.id;
  
    starIcon.classList.toggle('far');
    starIcon.classList.toggle('fas');
    starIcon.classList.toggle('gold');
  
    // Save the important state to localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.important = starIcon.classList.contains('fas');
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks
    function renderTasks() {
      if (taskList) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.className = 'task';
          li.dataset.id = task.id;
          li.innerHTML = `
            <div class="task-content">
              <span>${task.task}</span>
              <div class="task-actions">
                <button class="btn edit-btn"><i class="fas fa-edit"></i></button>
                <button class="btn delete-btn"><i class="fas fa-trash"></i></button>
                <button class="btn complete-btn" data-id="${task.id}"><i class="fas fa-check"></i></button>
                <button class="btn star-btn" onclick="toggleImportant(this)">
                  <i class="${task.important ? 'fas' : 'far'} fa-star ${task.important ? 'gold' : ''}"></i>
                </button>
              </div>
            </div>
          `;
          taskList.appendChild(li);
        });
      }
    }
  
    // Mark Task as Completed
    document.querySelectorAll('.complete-btn').forEach(button => {
      button.addEventListener('click', function () {
        const taskId = this.dataset.id;
        const task = tasks.find(task => task.id === taskId);
        if (task) {
          task.completed = true; // Mark task as completed
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks(); // Re-render tasks
        }
      });
    });
  
    // Render tasks on page load
    renderTasks();
  });
  document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Filter completed tasks
    const completedTasks = tasks.filter(task => task.completed);
  
    // Display completed tasks
    if (completedTasks.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No completed tasks found.';
      taskList.appendChild(li);
    } else {
      completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task';
        li.dataset.id = task.id;
        li.innerHTML = `
          <div class="task-content">
            <span>${task.task}</span>
            <div class="task-actions">
              <button class="btn edit-btn"><i class="fas fa-edit"></i></button>
              <button class="btn delete-btn"><i class="fas fa-trash"></i></button>
              <button class="btn complete-btn" data-id="${task.id}"><i class="fas fa-check"></i></button>
              <button class="btn star-btn" onclick="toggleImportant(this)">
                <i class="${task.important ? 'fas' : 'far'} fa-star ${task.important ? 'gold' : ''}"></i>
              </button>
            </div>
          </div>
        `;
        taskList.appendChild(li);
      });
    }
  });
  document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks
    function renderTasks() {
      if (taskList) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
          if (!task.deleted) { // Only show non-deleted tasks
            const li = document.createElement('li');
            li.className = 'task';
            li.dataset.id = task.id;
            li.innerHTML = `
              <div class="task-content">
                <span>${task.task}</span>
                <div class="task-actions">
                  <button class="btn edit-btn"><i class="fas fa-edit"></i></button>
                  <button class="btn delete-btn" data-id="${task.id}"><i class="fas fa-trash"></i></button>
                  <button class="btn complete-btn" data-id="${task.id}"><i class="fas fa-check"></i></button>
                  <button class="btn star-btn" onclick="toggleImportant(this)">
                    <i class="${task.important ? 'fas' : 'far'} fa-star ${task.important ? 'gold' : ''}"></i>
                  </button>
                </div>
              </div>
            `;
            taskList.appendChild(li);
          }
        });
      }
    }
  
    // Delete Task
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function () {
        const taskId = this.dataset.id;
        const task = tasks.find(task => task.id === taskId);
        if (task) {
          task.deleted = true; // Mark task as deleted
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks(); // Re-render tasks
        }
      });
    });
  
    // Render tasks on page load
    renderTasks();
  });
  document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Filter deleted tasks
    const deletedTasks = tasks.filter(task => task.deleted);
  
    // Display deleted tasks
    if (deletedTasks.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No deleted tasks found.';
      taskList.appendChild(li);
    } else {
      deletedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task';
        li.dataset.id = task.id;
        li.innerHTML = `
          <div class="task-content">
            <span>${task.task}</span>
            <div class="task-actions">
              <button class="btn restore-btn" data-id="${task.id}"><i class="fas fa-undo"></i> Restore</button>
              <button class="btn delete-permanently-btn" data-id="${task.id}"><i class="fas fa-trash"></i> Delete Permanently</button>
            </div>
          </div>
        `;
        taskList.appendChild(li);
      });
    }
  
    // Restore Deleted Task
    document.querySelectorAll('.restore-btn').forEach(button => {
      button.addEventListener('click', function () {
        const taskId = this.dataset.id;
        const task = tasks.find(task => task.id === taskId);
        if (task) {
          task.deleted = false; // Restore task
          localStorage.setItem('tasks', JSON.stringify(tasks));
          window.location.reload(); // Refresh the page
        }
      });
    });
  
    // Delete Task Permanently
    document.querySelectorAll('.delete-permanently-btn').forEach(button => {
      button.addEventListener('click', function () {
        const taskId = this.dataset.id;
        tasks = tasks.filter(task => task.id !== taskId); // Remove task permanently
        localStorage.setItem('tasks', JSON.stringify(tasks));
        window.location.reload(); // Refresh the page
      });
    });
  });