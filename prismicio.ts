import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

import sm from './sm.json';

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

export function linkResolver(doc: any) {
  switch (doc.type) {
    case 'homepage':
      return '/'
    case 'posts':
      return `/${doc.uid}`
    default:
      return '';
  }
}

export function createClient(config = {} as any) {
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  })

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}