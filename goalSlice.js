import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      name: 'Proyecto de Curso desarrollo web',
      description: 'Elaborar una aplicación web responsiva en la que se pueda llevar control de mis metas y tareas personales',
      dueDate: '31/05/2024'
    },
    {
      id: 2,
      name: 'Terminar de leer libro',
      description: 'Finalizar el libro de react',
      dueDate: '21/05/2024'
    },
    {
      id: 3,
      name: 'Laboratorio #1',
      description: 'Responder al test en el GES correspondiente a la actividad 1',
      dueDate: '20/05/2024'
    },
    {
      id: 4,
      name: 'Examen Parcial #1',
      description: 'Ingresar al GES y responder el test referente a la unidad 1',
      dueDate: '21/05/2024'
    }
  ]
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.items.push({
        id: Date.now(),
        ...action.payload
      });
    },
    removeGoal: (state, action) => {
      state.items = state.items.filter(goal => goal.id !== action.payload);
    }
  }
});

export const { addGoal, removeGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
