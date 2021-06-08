import gql from 'graphql-tag';

export const HELLO_QUERY = gql`
    {
        hello
    }
`;

export const GET_TASKS = gql`
query Tasks ($id: Float!) {
    getTasks(id: $id) {
        id
        pId
        task
        list {
            id
            pId
            task
        }
    }
}
`;

export const UPDATE_TASK = gql`
  mutation Tasks ($id: Float!, $task: String!) {
    updateTask(id: $id, task: $task)
  }
`;

export const ADD_TASK = gql`
  mutation Tasks ($pId: Float!, $task: String!) {
    addTask(pId: $pId, task: $task)
  }
`;

export const DELETE_TASK = gql`
  mutation Tasks ($id: Float!) {
    deleteTask(id: $id)
  }
`;