/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { Anchor, Box, Footer, Main, Text } from 'grommet';
import { Github, BarChart } from 'grommet-icons';

const Media = () => (
  <Box direction="row" gap="xxsmall" justify="center">
    <Anchor
      a11yTitle="Share feedback on Github"
      href="https://github.com/mawi12345/edu-teams-reports"
      icon={<Github color="brand" />}
    />
    {/*
    <Anchor
      a11yTitle="Chat with us on Slack"
      href="https://www.facebook.com/"
      icon={<Instagram color="brand" />}
    />
    <Anchor
      a11yTitle="Follow us on Twitter"
      href="https://twitter.com/"
      icon={<Twitter color="brand" />}
    />
    */}
  </Box>
);

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Teams Reports" defaultTitle="Teams Reports">
        <meta name="description" content="Display nice reports for edu teams" />
      </Helmet>
      <Main background="light-1" elevation="large" pad="medium" gap="large">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Main>
      <Footer background="light-3" pad="small">
        <Box align="center" direction="row" gap="xsmall">
          <BarChart color="brand" size="medium" />
          <Text alignSelf="center" color="brand" size="small">
            Teams Reports
          </Text>
        </Box>
        <Media />
        <Text textAlign="center" size="xsmall">
          © 2020 Martin Wind
        </Text>
      </Footer>
      <GlobalStyle />
    </BrowserRouter>
  );
}
