import DefaultTheme from 'vitepress/theme';
import './styles/vars.css';
import './styles/custom.css';

import BrandCard from './components/BrandCard.vue';
import BrandFilter from './components/BrandFilter.vue';
import NocSpeedCard from './components/NocSpeedCard.vue';
import NocUnlockMatrix from './components/NocUnlockMatrix.vue';
import AffNotice from './components/AffNotice.vue';
import TopicMatrix from './components/TopicMatrix.vue';

import SpeedTestPanel from './components/SpeedTestPanel.vue';
import UnlockMatrix from './components/UnlockMatrix.vue';
import TopologyPath from './components/TopologyPath.vue';
import AffiliateButton from './components/AffiliateButton.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BrandCard', BrandCard);
    app.component('BrandFilter', BrandFilter);
    app.component('NocSpeedCard', NocSpeedCard);
    app.component('NocUnlockMatrix', NocUnlockMatrix);
    app.component('AffNotice', AffNotice);
    app.component('TopicMatrix', TopicMatrix);

    app.component('SpeedTestPanel', SpeedTestPanel);
    app.component('UnlockMatrix', UnlockMatrix);
    app.component('TopologyPath', TopologyPath);
    app.component('AffiliateButton', AffiliateButton);
  }
};
