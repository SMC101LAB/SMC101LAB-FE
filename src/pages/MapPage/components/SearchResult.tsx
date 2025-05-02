import styled from 'styled-components';

interface SearchResultProps {
  resultCount: number;
  gradeCount: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
}

const SearchResult = ({ resultCount, gradeCount }: SearchResultProps) => {
  return (
    <Container>
      <ResultCount>
        검색결과 <Bold>{resultCount}</Bold>건
      </ResultCount>
      <GradeWrapper>
        {Object.entries(gradeCount).map(([grade, count]) => (
          <GradeItem key={grade} grade={grade}>
            <GradeLabel grade={grade}>{grade}</GradeLabel>
            <GradeCount>{count}</GradeCount>
          </GradeItem>
        ))}
      </GradeWrapper>
    </Container>
  );
};

export default SearchResult;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 25px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 10px 0px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ResultCount = styled.div`
  font-size: 15px;
  margin-right: 15px;
  color: #333;
  font-weight: 500;
`;

const Bold = styled.span`
  font-weight: 700;
  color: #0b5275;
`;

const GradeWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

interface GradeProps {
  grade: string;
}

const GradeItem = styled.div<GradeProps>`
  display: flex;
  align-items: center;
`;

const GradeLabel = styled.div<GradeProps>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 13px;
  color: white;
  background-color: ${({ grade, theme }) => {
    switch (grade) {
      case 'A':
        return theme.colors.grade.A;
      case 'B':
        return theme.colors.grade.B;
      case 'C':
        return theme.colors.grade.C;
      case 'D':
        return theme.colors.grade.D;
      case 'F':
        return theme.colors.grade.F;
    }
  }};
`;

const GradeCount = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
  color: #333;
`;
