/**
 *
 * ReportPage
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectFileContent } from '../../selectors';
import { push } from 'connected-react-router';
import { Box, Text } from 'grommet';
import { Help } from 'grommet-icons';
import {
  Container,
  Todo,
  TodoSum,
  TodoRow,
  TodoRowStudentSpacer,
  StudentRow,
  StudentResult,
  StudentSumResult,
  StudentName,
} from './components';

import { StudentPDFDownload } from './print';

interface Props {}

export function ReportPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const translation = useTranslation();
  const { t } = translation;
  const dispatch = useDispatch();
  const content = useSelector(selectFileContent);

  // redirect if no data is available
  useEffect(() => {
    if (
      !content.error &&
      (content.students.length === 0 || content.todos.length === 0)
    ) {
      dispatch(push('/'));
    }
  }, [content, dispatch]);

  return (
    <>
      <Helmet>
        <meta name="description" content={t('reportInfo')} />
      </Helmet>
      <Container
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <TodoRow>
          <TodoRowStudentSpacer />
          <TodoSum>{t('studentSum', { sum: content.sum })}</TodoSum>
          {content.todos.map((todo, index) => (
            <Todo key={index}>{todo.name}</Todo>
          ))}
        </TodoRow>
        {content.students.map(s => (
          <StudentRow key={`${s.first}-${s.last}`}>
            <StudentName>
              <StudentPDFDownload
                translation={translation}
                student={s}
                todos={content.todos}
                sum={content.sum}
              >
                {s.first} {s.last}
              </StudentPDFDownload>
            </StudentName>
            <StudentSumResult p={s.sumPercent}>{s.sumPercent}</StudentSumResult>
            {s.results.map((r, index) => (
              <StudentResult
                key={index}
                p={
                  content.todos[index].max === 0
                    ? 100
                    : Math.round((r * 100) / content.todos[index].max)
                }
              >
                {r}
              </StudentResult>
            ))}
          </StudentRow>
        ))}
      </Container>
      <Box pad={'medium'} direction={'row'} align={'center'}>
        <Box pad={'medium'}>
          <Help />
        </Box>
        <Box>
          <Text size="medium">{t('reportHelp1')}</Text>
          <Text size="medium">{t('reportHelp2')}</Text>
        </Box>
      </Box>
    </>
  );
}
