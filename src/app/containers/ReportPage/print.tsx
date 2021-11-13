import React, { useCallback } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
  Font,
} from '@react-pdf/renderer';
import { UseTranslationResponse } from 'react-i18next';
import { Student, Todo } from 'app/types';
import { saveAs } from 'file-saver';
import { Button, Box } from 'grommet';

Font.register({
  family: 'Roboto',
  fontWeight: 400,
  src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf',
});

Font.register({
  family: 'Roboto',
  fontWeight: 700,
  src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlvAw.ttf',
});

interface DocProps {
  student: Student;
  todos: Todo[];
  sum: number;
  translation: UseTranslationResponse;
}

interface DownloadProps extends DocProps {
  children: React.ReactNode;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Roboto',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    flexGrow: 0,
  },
  head: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: 0.2,
    borderTopColor: 'black',
    borderTopStyle: 'solid',
    paddingTop: 4,
    paddingBottom: 4,
    flexGrow: 0,
  },
  todo: {
    flexGrow: 1,
    width: 300,
  },
  percent: {
    flexGrow: 0,
    width: 40,
    textAlign: 'right',
  },
  points: {
    flexGrow: 0,
    width: 40,
    textAlign: 'right',
  },
  max: {
    flexGrow: 0,
    width: 40,
    textAlign: 'right',
  },
  h1: {
    fontSize: 16,
  },
  intro: {
    fontSize: 12,
  },
  todoText: {
    fontSize: 10,
  },
  todoHead: {
    fontSize: 10,
    fontWeight: 800,
  },
});

// Create Document Component
export function StudentDocument({
  student,
  translation,
  todos,
  sum,
}: DocProps) {
  const { t } = translation;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.h1}>
            {student.first} {student.last}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.intro}>
            {t('studentPrintIntro', {
              studentSum: student.sum,
              sum: student.max,
              studentSumPercent: student.sumPercent,
            })}
          </Text>
        </View>
        <View style={styles.head}>
          <View style={styles.todo}>
            <Text style={styles.todoHead}>{t('studentPrintHeadTodo')}</Text>
          </View>
          <View style={styles.percent}>
            <Text style={styles.todoHead}>{t('studentPrintHeadPercent')}</Text>
          </View>
          <View style={styles.points}>
            <Text style={styles.todoHead}>{t('studentPrintHeadPoints')}</Text>
          </View>
          <View style={styles.max}>
            <Text style={styles.todoHead}>{t('studentPrintHeadMax')}</Text>
          </View>
        </View>
        {student.results.map((r, index: number) => {
          const todo = todos[index];
          return (
            <View key={index} style={styles.row}>
              <View style={styles.todo}>
                <Text style={styles.todoText}>{todo.name}</Text>
              </View>
              <View style={styles.percent}>
                <Text style={styles.todoText}>
                  {r === undefined && '-'}
                  {r !== undefined &&
                    `${
                      todo.max === 0 ? 100 : Math.round((r * 100) / todo.max)
                    }%`}
                </Text>
              </View>
              <View style={styles.points}>
                <Text style={styles.todoText}>{r}</Text>
              </View>
              <View style={styles.max}>
                <Text style={styles.todoText}>{todo.max}</Text>
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}

export function StudentPDFDownload({
  student,
  children,
  ...rest
}: DownloadProps) {
  const onClick = useCallback(() => {
    const instance = pdf(<StudentDocument student={student} {...rest} />);
    instance.toBlob().then(blob => {
      saveAs(blob, `${student.last}_${student.first}.pdf`);
    });
  }, [rest, student]);

  return (
    <Button hoverIndicator="light-3" onClick={onClick}>
      <Box pad={{ horizontal: 'small' }} style={{ whiteSpace: 'nowrap' }}>
        {children}
      </Box>
    </Button>
  );
}
