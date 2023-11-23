export default ({ config }) => ({
  ...config,
  name: 'ShuttleX Integration',
  slug: 'shuttlex-integration',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
