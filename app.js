let allTodos = [
  {
    title: "Play Basketball",
    dueDate: "05-01-2020",
    description: "Go to the courts and play",
    isComplete: true,
  },
  {
    title: "Call Mom",
    dueDate: "05/2/2020",
    description: "Wish her happy birthday",
    isComplete: false,
  },
  {
    title: "Pick up food",
    dueDate: "05/4/2020",
    description: "Pick up food.",
    isComplete: false,
  },
  {
    title: "Go to the beach",
    dueDate: "05/13/2020",
    description: "Go to Jax Beach",
    isComplete: false,
  },
  {
    title: "Buy new outfit",
    dueDate: "05/6/2020",
    description: "Get jeans and a shirt",
    isComplete: true,
  },
  {
    title: "Buy shoes online",
    dueDate: "05/12/2020",
    description: "get new pair of Jordans",
    isComplete: true,
  },
];

let pendingTodos, completedTodos, expiredTodos;

function createElementFromTodo(todo) {
  const newElement = $(` <div class="todo">
  <h3><span class="title">${todo.title}</span><span class="due-date">${todo.dueDate}</span></h3>
  <pre>${todo.description}</pre>
  <footer class="actions">
    <button class="action complete">Complete</button>
    <button class="action delete">Delete</button>
  </footer>
</div>`);

  return newElement.data("todo", todo);
}

function storeData() {
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
}

function retrieveData() {
  allTodos = JSON.parse(localStorage.getItem("allTodos"));
}

function renderTodos() {
  $("main .content").empty();
  pendingTodos.forEach(function (todo) {
    $(".pending-todos").append(createElementFromTodo(todo));
  }),
    completedTodos.forEach(function (todo) {
      $(".completed-todos").append(createElementFromTodo(todo));
    }),
    expiredTodos.forEach(function (todo) {
      $(".expired-todos").append(createElementFromTodo(todo));
    });
}
splitTodos();
renderTodos();

$(".left-drawer").click(function (event) {
  $(event.target).hasClass("left-drawer") &&
    $("#app").toggleClass("drawer-open");
});

$("button.add-todo").click(function () {
  $(".modal").addClass("open");
});

$("button.create-todo").click(function () {
  $(".modal").removeClass("open");
});

$("button.cancel-create-todo").click(function () {
  $(".modal").removeClass("open");
});

function createTodoFromForm(todo) {
  return {
    title: todo.find("#todo-title").val(),
    dueDate: todo.find("#todo-due-date").val(),
    description: todo.find("#todo-description").val(),
    isComplete: false,
  };
}

$(".create-todo").click(function (create) {
  create.preventDefault();
  const todo = createTodoFromForm($(".todo-form"));
  allTodos.unshift(todo);
  $("todo-form").trigger("reset");
  $(".modal").removeClass("open");
  splitTodos();
  renderTodos();
});

$("main").on("click", ".action.complete", function () {
  $(this).closest(".todo").data("todo").isComplete = true;
  newElement.slideUp(function () {
    splitTodos();
    renderTodos();
  });
});

function isCurrent(todo) {
  const todoDueDate = new Date(todo.dueDate);
  const now = new Date();

  return now < todoDueDate;
}

function splitTodos() {
  (pendingTodos = allTodos.filter(function pending(todo) {
    if (todo.isComplete === false && isCurrent(todo)) {
      return pending;
    }
  })),
    (completedTodos = allTodos.filter(function completed(todo) {
      if (todo.isComplete === true) {
        return completed;
      }
    })),
    (expiredTodos = allTodos.filter(function expired(todo) {
      if (todo.isComplete === false && !isCurrent(todo)) {
        return expired;
      }
    }));
}

$("main").on("click", ".action.delete", function () {
  allTodos.splice(allTodos.indexOf(), 1),
    storeData(),
    splitTodos(),
    renderTodos();
});

$(".remove-completed").click(function () {
  allTodos.filter(function (todo) {
    return !todo.isComplete;
  }),
    storeData(),
    splitTodos(),
    renderTodos();
});

$(".remove-expired").click(function () {
  filter(function (todo) {
    return isCurrent(todo);
  }),
    storeData(),
    splitTodos(),
    renderTodos();
});
