/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { useDropzone } from 'react-dropzone';
import { HomePage } from './containers/HomePage/Loadable';
import { ErrorPage } from './components/ErrorPage/Loadable';
import { ReportPage } from './containers/ReportPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { Anchor, Box, Footer, Main, Text } from 'grommet';
import { Github, BarChart } from 'grommet-icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { appSaga } from './saga';

const DropTarget = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

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
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const dispatch = useDispatch();
  useInjectSaga({ key: sliceKey, saga: appSaga });

  const onDrop = React.useCallback(
    acceptedFiles => {
      const [file] = acceptedFiles;
      dispatch(actions.readBlob(file as Blob));
    },
    [dispatch],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <>
      <Helmet titleTemplate="%s - Teams Reports" defaultTitle="Teams Reports">
        <meta name="description" content="Display nice reports for edu teams" />
      </Helmet>
      <DropTarget {...getRootProps()}>
        <Main
          background={isDragActive ? 'light-2' : 'light-1'}
          elevation="large"
          gap="large"
        >
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/error" component={ErrorPage} />
            <Route exact path="/report" component={ReportPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Main>
        <Footer
          background="light-3"
          pad="small"
          onClick={e => {
            e.stopPropagation();
          }}
        >
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
        <input {...getInputProps()} />
      </DropTarget>
      <GlobalStyle />
    </>
  );
}
