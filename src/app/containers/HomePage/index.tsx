import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Text, Heading, List, Button, Image } from 'grommet';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <meta name="description" content={t('intro')} />
      </Helmet>
      <Box flex justify="center" align="center" background="brand" fill>
        <Heading>{t('heading')}</Heading>
        <Box align="center" pad="large">
          <List
            style={{ textAlign: 'center' }}
            data={[t('feature1'), t('feature2'), t('feature3')]}
          />
        </Box>
        <Text margin="small" size="medium">
          {t('help')}
        </Text>
        <Button label={t('selectFile')} />
        <Image margin={{ top: '22px' }} src={'teams_export.png'} />
      </Box>
    </>
  );
}
