import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};



// ===================== CREATE TODO =====================
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (text, thunkAPI) => {
    try {
      const res = await API.post("/todos", {
        text,
        completed: false,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to create todo"
      );
    }
  }
);



// ===================== FETCH TODOS =====================
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/todos");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch todos"
      );
    }
  }
);



// ===================== UPDATE TODO TEXT =====================
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, text }, thunkAPI) => {
    try {
      const res = await API.put(`/todos/${id}`, { text });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update todo"
      );
    }
  }
);



// ===================== TOGGLE COMPLETE =====================
export const toggleComplete = createAsyncThunk(
  "todos/toggleComplete",
  async (id, thunkAPI) => {
    try {
      const res = await API.patch(`/todos/toggle/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to toggle todo"
      );
    }
  }
);



// ===================== DELETE TODO =====================
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    if (!id) {
      return thunkAPI.rejectWithValue("Todo ID is missing");
    }
    try {
      const res = await API.delete(`/todos/${id}`);
      return res.data._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete todo"
      );
    }
  }
);



// ===================== SLICE =====================
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ===== CREATE =====
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== FETCH =====
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.todos = action.payload;
        } else if (Array.isArray(action.payload.todos)) {
          state.todos = action.payload.todos;
        } else {
          state.todos = [];
        }
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== UPDATE TEXT =====
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        );
      })

      // ===== TOGGLE COMPLETE =====
      .addCase(toggleComplete.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        );
      })

      // ===== DELETE =====
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo._id !== action.payload
        );
      });

  },
});

export default todoSlice.reducer;
