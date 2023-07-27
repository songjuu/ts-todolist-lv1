import React, { useState } from "react";
import uuid from "react-uuid";

function App() {
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  //todo 타입 설정
  type TodoType = {
    id: string;
    title: string;
    contents: string;
    isDone: boolean;
  };

  //인터페이스 지정해서 타입 설정
  const [todos, setTodos] = useState<TodoType[]>([
    {
      id: uuid(),
      title: "제목1",
      contents: "내용1",
      isDone: false,
    },
    {
      id: uuid(),
      title: "제목2",
      contents: "내용2",
      isDone: true,
    },
    {
      id: uuid(),
      title: "제목3",
      contents: "내용3",
      isDone: false,
    },
    {
      id: uuid(),
      title: "제목4",
      contents: "내용4",
      isDone: false,
    },
  ]);

  //새로운 todo 추가
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: uuid(),
      title: title,
      contents: contents,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setContents("");
  };

  //title, content input onChange 함수
  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const inputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  //todo 삭제
  const deleteTodo = (todo: TodoType): void => {
    const updatedTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(updatedTodos);
  };

  //todo 완료 or 취소
  const toggleTodo = (todo: TodoType): void => {
    const updatedTodos = todos.map((item) =>
      item.id === todo.id ? { ...item, isDone: !item.isDone } : item
    );
    setTodos(updatedTodos);
  };

  //----------------------------------------------------------------
  return (
    <div>
      <header style={{ backgroundColor: "#d9e7ff", padding: "10px" }}>
        헤더입니다
      </header>
      <main style={{ backgroundColor: "#ffffe6", padding: "10px" }}>
        메인입니다
        <form onSubmit={addTodo}>
          <div>
            <input value={title} onChange={inputTitle} />
            <input value={contents} onChange={inputContent} />
            <button>입력</button>
          </div>
        </form>
        <div>
          <div>
            <h2>할일 목록</h2>
            {todos
              .filter((todo) => {
                return todo.isDone === false;
              })
              .map((todo) => {
                return (
                  <div
                    key={todo.id}
                    style={{ border: "1px solid black", marginBottom: "10px" }}
                  >
                    <p>{todo.id}</p>
                    <h2>{todo.title}</h2>
                    <p>{todo.contents}</p>
                    <p>{todo.isDone.toString()}</p>
                    <button
                      onClick={() => {
                        deleteTodo(todo);
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        toggleTodo(todo);
                      }}
                    >
                      완료
                    </button>
                  </div>
                );
              })}
          </div>
          <div>
            <h2>해야할 일 목록</h2>

            {todos
              .filter((todo) => {
                return todo.isDone === true;
              })
              .map((todo) => {
                return (
                  <div
                    key={todo.id}
                    style={{ border: "1px solid black", marginBottom: "10px" }}
                  >
                    <p>{todo.id}</p>
                    <h2>{todo.title}</h2>
                    <p>{todo.contents}</p>
                    <p>{todo.isDone.toString()}</p>
                    <button
                      onClick={() => {
                        deleteTodo(todo);
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        toggleTodo(todo);
                      }}
                    >
                      취소
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
      <footer style={{ backgroundColor: "#feebff", padding: "10px" }}>
        푸터입니다
      </footer>
    </div>
  );
}

export default App;
