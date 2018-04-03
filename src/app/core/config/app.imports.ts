import 'jquery';
import 'bootstrap';
import '../../../styles/styles.scss'

import fontawesome from '@fortawesome/fontawesome';

fontawesome.config.searchPseudoElements = true;

import brand from '@fortawesome/fontawesome-free-brands';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(brand, regular, solid);
