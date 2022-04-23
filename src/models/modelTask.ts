interface ITodo{
  id: string,
  title: string,
  tasks: ITask[],
  user_id: string,
  created_at: string
}

interface ITask{
  id: string,
  title: string,
  checked: boolean
}

export { ITodo, ITask }
