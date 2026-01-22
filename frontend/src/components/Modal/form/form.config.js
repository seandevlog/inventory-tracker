import modes from '../modal.modes';

const config = (mode) => 
  mode === modes.VIEW
  ? {
      hideDeleteButton: true,
      hideSaveButton: true,
      hideEditButton: false,
      disabled: true
    }
  : mode === modes.CREATE
  ? {
      hideDeleteButton: true,
      hideSaveButton: false,
      hideEditButton: true,
      disabled: false
    }
  : mode === modes.EDIT
  ? {
      hideDeleteButton: false,
      hideSaveButton: false,
      hideEditButton: true,
      disabled: false
    }
  : {};

export default config;