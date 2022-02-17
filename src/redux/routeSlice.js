import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { 
  route: null,
  train: null,
  trainBack: null,
  coach: null,
  coachBack: null,
  activeType: 'adult',
  activeTypeBack: 'adult',
  seatsOneWay: [],
  seatsWayBack: [],
  status: 'idle' 
};

export const fetchTrain = createAsyncThunk('searchSlice/fetchTrain', async (url, { rejectWithValue }) => {

  try {
    const result = await fetch(url)
      .then( response => response.json())
    return result
  } catch (error) {
    return rejectWithValue('Opps there seems to be an error')
  }

});

export const fetchTrainBack = createAsyncThunk('searchSlice/fetchTrainBack', async (url, { rejectWithValue }) => {

  try {
    const result = await fetch(url)
      .then( response => response.json())
    return result
  } catch (error) {
    return rejectWithValue('Opps there seems to be an error')
  }

});

const routeSlice = createSlice({
  name: 'routeSlice',
  initialState,
  reducers: {
    setRoute(state, action) {
      state.route = action.payload
    },
    setCoach(state, action) {
      state.coach = action.payload
    },
    setCoachBack(state, action) {
      state.coachBack = action.payload
    },
    setActiveType(state, action) {
      state.activeType = action.payload
    },
    setActiveTypeBack(state, action) {
      state.activeTypeBack = action.payload
    },
    addSeatWay(state, action) {
      state.seatsOneWay.some(a => (a.seat_number === action.payload.seat_number) && (a.coach_id === action.payload.coach_id)) ?
      state.seatsOneWay = state.seatsOneWay.filter(item => 
        item.seat_number !== action.payload.seat_number || item.coach_id !== action.payload.coach_id 
        // for (let key in action.payload) {
        //   if (item[key] === undefined || item[key] !== action.payload[key])
        //     return item[key] !== action.payload[key]
        // }
      ) : 
      state.seatsOneWay.push(action.payload)
    },
    addSeatBack(state, action) {
      state.seatsWayBack.some(a => (a.seat_number === action.payload.seat_number) && (a.coach_id === action.payload.coach_id)) ?
      state.seatsWayBack = state.seatsWayBack.filter(item => 
        item.seat_number !== action.payload.seat_number || item.coach_id !== action.payload.coach_id 
      ) : 
      state.seatsWayBack.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrain.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchTrain.fulfilled, (state, action) => {
      state.train = action.payload;
      state.status = 'success';
    })
    builder.addCase(fetchTrain.rejected, (state, action) => {
      state.status = 'error';
    })
    builder.addCase(fetchTrainBack.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchTrainBack.fulfilled, (state, action) => {
      state.trainBack = action.payload;
      state.status = 'success';
    })
    builder.addCase(fetchTrainBack.rejected, (state, action) => {
      state.status = 'error';
    })
  }
});

export const routeActions = routeSlice.actions;
export default routeSlice.reducer;