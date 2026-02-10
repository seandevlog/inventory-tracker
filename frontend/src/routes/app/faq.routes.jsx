import Faq from '@pages/app/faq/faq'

import config from '@config';
const { path } = config;

const faq = { 
  id: path.faq.relative,
  path: path.faq.relative, 
  Component: Faq, 
}

export default faq;