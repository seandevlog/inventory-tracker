import Faq from '@pages/faq/faq'

import config from '@config';
const { path } = config;

const faq = { 
  id: path.faq.relative,
  path: path.faq.relative, 
  Component: Faq, 
}

export default faq;