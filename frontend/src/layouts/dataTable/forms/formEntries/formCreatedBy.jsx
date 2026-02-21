const FormCreatedBy = ({ value, placeholder, styles, mode }) => {
  if (mode === 'create') return (
    <div>
      <span><p></p></span>
      {value &&
        <input id='createdBy' name='createdBy' value={value ?? ''} type='hidden'/>
      }
    </div>
  )

  return (
    <div className={styles?.createdBy}>
      <span><p>Created By</p></span>
      {value ?
        <input id='createdBy' name='createdBy' value={value} placeholder={placeholder} readOnly/> :
        <input id='createdBy' placeholder={placeholder} readOnly/>
      }
    </div>
  )
}

export default FormCreatedBy;