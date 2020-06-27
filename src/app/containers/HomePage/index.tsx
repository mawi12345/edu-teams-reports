import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Text, Heading, List } from 'grommet';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('welcome')}</title>
        <meta name="description" content={t('intro')} />
      </Helmet>
      <Box flex justify="center" align="center" background="brand" fill>
        <Heading>{t('welcome')}</Heading>
        <Text margin="small" size="medium">
          {t('intro')}
        </Text>
        <Box align="center" pad="large">
          <List data={[t('feature1'), t('feature2'), t('feature3')]} />
        </Box>
        <Text margin="small" size="medium">
          {t('help')}
        </Text>
      </Box>
    </>
  );
}
