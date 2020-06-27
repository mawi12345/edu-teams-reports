import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
`;

// Header

export const TodoRow = styled.div`
  display: flex;
  height: 310px;
`;

export const TodoRowStudentSpacer = styled.div`
  min-width: 210px;
`;

export const Todo = styled.div`
  white-space: nowrap;
  transform: rotate(-90deg) translateX(-280px);
  width: 40px;
  height: 0px;
  line-height: 0px;
`;

export const TodoSum = styled(Todo)`
  width: 60px;
  transform: rotate(-90deg) translateX(-270px);
`;

// Students

export const StudentRow = styled.div`
  display: flex;
`;

export const StudentName = styled.div`
  min-width: 200px;
  max-width: 200px;
  text-overflow: ellipsis;
  text-align: right;
  height: 40px;
  line-height: 40px;
  margin-right: 10px;

  a {
    color: inherit;
  }
`;

export interface StudentResultProps {
  p: number;
}

export const StudentResult = styled.div<StudentResultProps>`
  min-width: 32px;
  max-width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: rgb(245, 245, 245);
  border-radius: 20px;
  margin: 4px;
  color: ${({ p }) => `hsl(${p}, 100%, 30%)`};
`;

export const StudentSumResult = styled(StudentResult)`
  margin: 4px 14px;
  border: 1px solid rgb(9, 11, 19);
`;
