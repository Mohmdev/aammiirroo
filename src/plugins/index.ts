import { Plugin } from 'payload'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { s3StoragePlugin } from '../modules/Upload/s3Storage'
import { nestedDocsPluginConfig } from '../modules/Content/nestedDocs'
import { seoPluginConfig } from '../modules/Content/seo'
import { formBuilderPluginConfig } from '../modules/Settings/FormBuilder/config'
import { redirectsPluginConfig } from '../modules/Settings/Redirects/config'
import { searchPluginConfig } from '../modules/Settings/Search/config'

export const plugins: Plugin[] = [
  s3StoragePlugin,
  redirectsPluginConfig,
  nestedDocsPluginConfig,
  seoPluginConfig,
  formBuilderPluginConfig,
  searchPluginConfig,
  payloadCloudPlugin(),
]
