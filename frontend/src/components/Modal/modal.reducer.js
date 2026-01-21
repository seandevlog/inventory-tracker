import actions from './modal.actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actions.CREATE: {
      return {
        ...state,
        show: true,
      }
    }
    case actions.EDIT: {
      return {
        ...state,
        show: true,
        data: { ...state.data, ...action.payload }
      }
    }
    case actions.CLOSE: {
      return {
        ...state,
        show: false,
        data: {}
      }
    }
  }
  throw Error(`Unknown action: ${action.type}`)
};

export default reducer;