import { useContext } from 'react';
import { supplierSchema } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Supplier from '@assets/placeholders/supplier.svg';

import Main from '@layouts/main/main';

import AppContext from '@contexts/app.context'; 

const Suppliers = () => {
  const { suppliers, bumpSupplierRefresh } = useContext(AppContext);

  return (
    <>
      <Main
        id='supplier'
        data={suppliers}
        headers={headers}
        FeaturePlaceholder={Supplier}
        inputs={inputs}
        schema={supplierSchema}
        onSubmitted={bumpSupplierRefresh}
      />
    </>
  )
}

export default Suppliers