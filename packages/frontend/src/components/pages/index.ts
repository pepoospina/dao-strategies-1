import { lazier } from 'eth-hooks/helpers';

// the components and pages are lazy loaded for performance and bundle size reasons
// code is in the component file

export const CampaignCreate = lazier(() => import('./create/CampaignCreate'), 'CampaignCreate');

export const CampaignsList = lazier(() => import('./list/CampaignsList'), 'CampaignsList');

export const CampaignPage = lazier(() => import('./campaign/CampaignPage'), 'CampaignPage');
