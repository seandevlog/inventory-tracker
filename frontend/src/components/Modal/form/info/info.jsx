import styles from './info.module.css';
import ValidatedInput from '@components/validatedInput/validatedInput';

const Info = ({ schema, data, inputs, disabled }) => {
  return (
    <fieldset className={styles.info}>
      <legend>Info</legend>
      {inputs.map(input => (
        <ValidatedInput
          key={input.id}
          id={input.id}
          label={input.label}
          type={input.type}
          autoComplete={input.autoComplete}
          value={data?.[`${input.id}`]}
          disabled={disabled}
          schema={schema}
          className='info'
        >
        </ValidatedInput>
      ))}
    </fieldset>
  )
}

export default Info;