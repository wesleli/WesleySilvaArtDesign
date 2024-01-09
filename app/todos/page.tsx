"Use Client"

import { todo } from "node:test";

type Todo = {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
};

    async function getData(): Promise<Todo[]> {

        const res = await fetch("https://jsonplaceholder.typicode.com/todos/")
        if(!res.ok){
            throw new Error("falha ao carregar Todos")
        }

        const data = await res.json()
        return data

    }

export default async function  Todos(){
    const todos = await getData()

    return <>
            <ul>
                {todos.map((todo) =>  (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
    </>
}