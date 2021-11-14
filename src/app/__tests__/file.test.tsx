import { csvBlobToTable, parseFile } from '../file';

const testData = `"Vorname","Nachname","E-Mail-Adresse","<name-of-task1>","Punkt","Feedback","<name-of-task2>","Punkt","Feedback","<name-of-task3>","Punkt","Feedback"
"Vorname1","Nachname1","1@schule.at","6","7","","20","25","","","10",""
"Vorname2","Nachname2","2@schule.at","5","7","","20","25","","9","10",""
"Vorname3","Nachname3","3@schule.at","7","7","","20","25","","10","10",""
`;

describe('file', () => {
  it('should convert blob to table', async () => {
    const blob = new Blob([testData], {
      type: 'text/plain',
    });
    const row = await csvBlobToTable(blob);
    expect(row).toMatchSnapshot();
  });

  it('should parse table', async () => {
    const blob = new Blob([testData], {
      type: 'text/plain',
    });
    const row = await csvBlobToTable(blob);
    const content = parseFile(row);
    expect(content).toMatchSnapshot();
  });
});
