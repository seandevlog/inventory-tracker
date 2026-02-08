import { useContext } from 'react';
import { supplierSchema } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import ManageContext from '@contexts/manage.context';

import Supplier from '@assets/placeholders/supplier.svg';

import Main from '@layouts/main/main';

const Suppliers = () => {
  const { suppliers } = useContext(ManageContext);

  return (
    <>
      <Main
        id='supplier'
        data={suppliers}
        headers={headers}
        FeaturePlaceholder={Supplier}
        inputs={inputs}
        schema={supplierSchema}
      />
    </>
  )
}

export default Suppliers