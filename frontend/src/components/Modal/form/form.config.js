import modes from '../modal.modes';

const config = (mode) => 
  mode === modes.VIEW
  ? {
      hideDeleteButton: true,
      hideSaveButton: true,
      hideEditButton: false,
      disableInputs: true
    }
  : mode === modes.CREATE
  ? {
      hideDeleteButton: true,
      hideSaveButton: false,
      hideEditButton: true,
      disableInputs: false
    }
  : mode === modes.EDIT
  ? {
      hideDeleteButton: false,
      hideSaveButton: false,
      hideEditButton: true,
      disableInputs: false
    }
  : {};

export default config;