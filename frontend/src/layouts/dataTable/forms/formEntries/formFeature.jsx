const FormFeature = ({ FeaturePlaceholder, featureUrl }) => {
  return (
    <fieldset>
      {featureUrl ? <img src={featureUrl} /> : <FeaturePlaceholder />}
    </fieldset>
  );
}

export default FormFeature;