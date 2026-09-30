const STORAGE_KEY = 'todo-list-items';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const remainingCount = document.getElementById('remaining-count');

// 從瀏覽器讀取已儲存的待辦事項；資料格式不正確時以空清單開始。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(savedTodos)) return [];

    return savedTodos.filter(
      (todo) =>
        todo &&
        typeof todo.id === 'string' &&
        typeof todo.text === 'string' &&
        typeof todo.completed === 'boolean'
    );
  } catch {
    return [];
  }
}

let todos = loadTodos();

// 將目前清單同步到瀏覽器儲存空間。
function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('無法儲存待辦事項。', error);
  }
}

// 依照資料重繪清單，並同步更新空狀態與未完成數量。
function renderTodos() {
  list.replaceChildren();

  todos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = todo.completed ? 'todo-item is-completed' : 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.className = 'todo-checkbox';
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.dataset.action = 'toggle';
    checkbox.dataset.id = todo.id;
    checkbox.setAttribute('aria-label', `標記「${todo.text}」為完成`);

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.dataset.action = 'delete';
    deleteButton.dataset.id = todo.id;
    deleteButton.textContent = '×';
    deleteButton.setAttribute('aria-label', `刪除「${todo.text}」`);
    deleteButton.title = '刪除';

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  emptyState.hidden = todos.length > 0;
  remainingCount.textContent = `未完成:${todos.filter((todo) => !todo.completed).length} 項`;
}

// 送出表單時去除前後空白，空內容不加入清單。
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  input.value = '';
  input.focus();
});

// 透過事件委派處理完成切換與刪除。
list.addEventListener('change', (event) => {
  const checkbox = event.target.closest('[data-action="toggle"]');
  if (!checkbox) return;

  todos = todos.map((todo) =>
    todo.id === checkbox.dataset.id ? { ...todo, completed: checkbox.checked } : todo
  );
  saveTodos();
  renderTodos();
});

list.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('[data-action="delete"]');
  if (!deleteButton) return;

  todos = todos.filter((todo) => todo.id !== deleteButton.dataset.id);
  saveTodos();
  renderTodos();
});

renderTodos();