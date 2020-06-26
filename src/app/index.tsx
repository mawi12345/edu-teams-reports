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
import csv from 'csv-parser';
import { GlobalStyle } from 'styles/global-styles';
import { useDropzone } from 'react-dropzone';
import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { Anchor, Box, Footer, Main, Text } from 'grommet';
import { Github, BarChart } from 'grommet-icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { appSaga } from './saga';
import { Row } from './types';

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
      // Do something with the files
      const [file] = acceptedFiles;
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const parser = csv({ separator: ',', headers: false });
        const results: object[] = [];
        parser.on('data', data => results.push(data));
        parser.on('end', () => {
          dispatch(actions.setRows(results as Row[]));
        });
        parser.write(reader.result);
        parser.end();
      };
      reader.readAsText(file);
    },
    [dispatch],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <BrowserRouter>
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
        <input {...getInputProps()} />
      </DropTarget>
      <GlobalStyle />
    </BrowserRouter>
  );
}
