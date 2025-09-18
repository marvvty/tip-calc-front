import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  CreateCheckDto,
  CreatedAccount,
  UpdateCheckDto,
} from "../../types/types";
import * as api from "../../api/requests";

interface CheckState {
  checks: CreatedAccount[];
  selectedCheck: CreatedAccount | null;
  showForm: boolean;
  showCards: boolean;
  showLoading: boolean;
}

const initialState: CheckState = {
  checks: [],
  selectedCheck: null,
  showForm: false,
  showCards: true,
  showLoading: false,
};

export const fetchCheks = createAsyncThunk<CreateCheckDto[]>(
  "checks/fetchAll",
  async () => await api.getAll()
);

export const createCheck = createAsyncThunk<CreatedAccount, CreateCheckDto>(
  "checks/create",
  async (data) => await api.create(data)
);

export const updateCheck = createAsyncThunk<
  CreatedAccount,
  { id: number; data: UpdateCheckDto }
>(
  "checks/update",
  async ({ id, data }) => await api.update(id.toString(), data)
);

export const deleteCheck = createAsyncThunk<any, number>(
  "checks/delete",
  async (id) => {
    await api.deleteItem(id.toString());
    return id;
  }
);

export const calcCheck = createAsyncThunk<any, number>(
  "checks/calc",
  async (id) => await api.calculateItem(id.toString())
);

const checkSlice = createSlice({
  name: "checks",
  initialState,
  reducers: {
    setSelectedCheck(state, action: PayloadAction<CreatedAccount | null>) {
      state.selectedCheck = action.payload;
    },
    toogleForm(state, action: PayloadAction<boolean>) {
      state.showForm = action.payload;
      state.showCards = !action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCheks.pending, (state) => {
      state.showLoading = true;
    });
  },
});
