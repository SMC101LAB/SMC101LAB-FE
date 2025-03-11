import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface TermsofUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsofUseModal = ({ isOpen, onClose }: TermsofUseModalProps) => {
  const [animationOpen, setAnimationOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimationOpen(true), 10);
      document.body.style.overflow = 'hidden'; // 모달이 열릴 때 스크롤 방지
    } else {
      setAnimationOpen(false);
      document.body.style.overflow = 'unset'; // 모달이 닫힐 때 스크롤 허용
    }

    // 컴포넌트 언마운트 시 스크롤 허용으로 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalContainer $animationOpen={animationOpen}>
      <ModalHeader>
        <HeaderTitle>이용약관</HeaderTitle>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </ModalHeader>
      <ModalContent>
        <PolicyTitle>
          SMC101LAB 급경사지 데이터 시각화 시스템 이용약관
        </PolicyTitle>

        <Section>
          <PolicySubtitle>제1조 (목적)</PolicySubtitle>
          <PolicyText>
            본 약관은 SMC101(이하 "회사")이 제공하는 급경사지 데이터 시각화
            시스템 서비스(이하 "서비스")의 이용 조건 및 절차, 회사와 이용자 간의
            권리와 의무 등을 규정함을 목적으로 합니다.
          </PolicyText>
        </Section>

        <Section>
          <PolicySubtitle>제2조 (용어의 정의)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              "서비스"란 회사가 제공하는 급경사지 데이터 시각화 시스템 웹 및
              모바일 애플리케이션을 의미합니다.
            </NumberedItem>
            <NumberedItem>
              "이용자"란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는
              자를 의미합니다.
            </NumberedItem>
            <NumberedItem>
              "관리자"란 서비스의 운영 및 관리를 담당하는 이용자를 의미합니다.
            </NumberedItem>
            <NumberedItem>
              "일반 사용자"란 데이터 조회 및 검색 기능을 사용할 수 있는 이용자를
              의미합니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제3조 (약관의 효력 및 변경)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게
              공지함으로써 효력이 발생합니다.
            </NumberedItem>
            <NumberedItem>
              회사는 필요하다고 인정되는 경우 본 약관을 변경할 수 있으며, 변경된
              약관은 제1항과 같은 방법으로 공지함으로써 효력이 발생합니다.
            </NumberedItem>
            <NumberedItem>
              이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고
              탈퇴할 수 있으며, 변경된 약관의 효력 발생일 이후에도 서비스를 계속
              이용하는 경우 약관 변경에 동의한 것으로 간주됩니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제4조 (서비스 이용 계약의 성립)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              서비스 이용 계약은 이용자가 본 약관에 동의하고 회사가 정한 방법에
              따라 서비스 이용을 신청하면, 회사가 이를 승낙함으로써 성립됩니다.
            </NumberedItem>
            <NumberedItem>
              회사는 다음 각 호에 해당하는 경우 이용 신청을 승낙하지 않을 수
              있습니다.
              <PolicyList>
                <PolicyListItem>
                  실명이 아니거나 타인의 명의를 이용한 경우
                </PolicyListItem>
                <PolicyListItem>
                  허위 정보를 기재하거나 회사가 요구하는 정보를 제공하지 않은
                  경우
                </PolicyListItem>
                <PolicyListItem>
                  관련 법령에 위배되거나 사회의 안녕과 질서, 미풍양속을 저해할
                  목적으로 신청한 경우
                </PolicyListItem>
                <PolicyListItem>
                  기타 회사가 정한 이용신청 요건이 충족되지 않은 경우
                </PolicyListItem>
              </PolicyList>
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제5조 (이용자 계정 및 관리)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              이용자는 전화번호를 통해 계정을 생성하며, 관리자 승인 후 서비스를
              이용할 수 있습니다.
            </NumberedItem>
            <NumberedItem>
              이용자는 자신의 계정 정보를 안전하게 관리해야 하며, 계정 정보의
              유출로 인한 피해는 이용자 본인이 책임집니다.
            </NumberedItem>
            <NumberedItem>
              이용자는 자신의 계정이 무단으로 사용된 것을 발견한 경우 즉시
              회사에 통보하고 회사의 안내에 따라야 합니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제6조 (권한 및 권한 제한)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              이용자의 권한은 관리자와 일반 사용자로 구분됩니다.
            </NumberedItem>
            <NumberedItem>
              관리자는 다음 권한을 가집니다.
              <PolicyList>
                <PolicyListItem>
                  데이터 입력, 수정, 삭제 등 CRUD 기능
                </PolicyListItem>
                <PolicyListItem>엑셀 기반 대량 데이터 처리</PolicyListItem>
                <PolicyListItem>회원 관리 및 권한 설정</PolicyListItem>
              </PolicyList>
            </NumberedItem>
            <NumberedItem>
              일반 사용자는 다음 권한을 가집니다.
              <PolicyList>
                <PolicyListItem>데이터 조회</PolicyListItem>
                <PolicyListItem>
                  검색 기능 (등급별, 지역별, 붕괴위험지구 지정여부, 위치 기반)
                </PolicyListItem>
              </PolicyList>
            </NumberedItem>
            <NumberedItem>
              회사는 이용자가 다음 각 호에 해당하는 행위를 한 경우 사전 통보
              없이 권한을 제한하거나 계정을 정지할 수 있습니다.
              <PolicyList>
                <PolicyListItem>
                  타인의 정보를 도용하거나 허위 정보를 등록하는 행위
                </PolicyListItem>
                <PolicyListItem>
                  서비스의 운영을 방해하거나 안정성을 해치는 행위
                </PolicyListItem>
                <PolicyListItem>
                  타인의 명예를 훼손하거나 저작권 등 지적재산권을 침해하는 행위
                </PolicyListItem>
                <PolicyListItem>
                  기타 법령 또는 본 약관에 위배되는 행위
                </PolicyListItem>
              </PolicyList>
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제7조 (데이터 관리 및 이용)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              시스템에 등록된 데이터는 국가적 급경사지 관리를 위한 목적으로만
              사용되어야 합니다.
            </NumberedItem>
            <NumberedItem>
              이용자는 데이터의 정확성과 무결성을 유지하기 위해 노력해야 합니다.
            </NumberedItem>
            <NumberedItem>
              회사는 데이터의 백업 및 보안 유지를 위해 최선을 다하지만,
              천재지변, 기술적 문제 등으로 인한 데이터 손실에 대해 책임지지
              않습니다.
            </NumberedItem>
            <NumberedItem>
              이용자는 취득한 데이터를 제3자에게 무단으로 제공하거나 상업적
              목적으로 활용할 수 없습니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제8조 (서비스 제공 및 변경)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              회사는 이용자에게 급경사지 데이터 시각화 및 관리 서비스를
              제공합니다.
            </NumberedItem>
            <NumberedItem>
              회사는 시스템 점검, 보수 등의 사유로 서비스 제공을 일시적으로
              중단할 수 있으며, 사전에 공지합니다. 다만, 긴급한 경우에는 사후에
              공지할 수 있습니다.
            </NumberedItem>
            <NumberedItem>
              회사는 서비스의 내용, 이용 방법, 이용 시간을 변경할 수 있으며,
              변경 사항은 서비스 내 공지사항을 통해 공지합니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제9조 (개인정보 보호)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              회사는 이용자의 개인정보를 중요시하며, 관련 법령을 준수합니다.
            </NumberedItem>
            <NumberedItem>
              개인정보 보호에 관한 상세한 내용은 별도의 "개인정보처리방침"을
              통해 확인할 수 있습니다.
            </NumberedItem>
            <NumberedItem>
              회사는 이용자의 개인정보를 서비스 제공 및 운영에 필요한 범위
              내에서만 활용합니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제10조 (이용자의 의무)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              이용자는 다음 각 호의 행위를 해서는 안 됩니다.
              <PolicyList>
                <PolicyListItem>
                  회원가입 신청 또는 변경 시 허위 내용을 등록하는 행위
                </PolicyListItem>
                <PolicyListItem>
                  시스템 내 데이터를 무단으로 변조하는 행위
                </PolicyListItem>
                <PolicyListItem>
                  회사의 서비스를 방해하거나 그 정보를 도용, 탈취하는 행위
                </PolicyListItem>
                <PolicyListItem>
                  회사 및 제3자의 지적재산권을 침해하는 행위
                </PolicyListItem>
                <PolicyListItem>기타 관련 법령에 위배되는 행위</PolicyListItem>
              </PolicyList>
            </NumberedItem>
            <NumberedItem>
              이용자는 본 약관에서 규정하는 사항과 서비스 이용안내, 공지사항 등
              회사가 공지하는 사항을 준수해야 합니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제11조 (지적재산권)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              서비스 내 회사가 제공하는 콘텐츠에 대한 저작권 및 기타
              지적재산권은 회사에 귀속됩니다.
            </NumberedItem>
            <NumberedItem>
              이용자는 회사의 사전 서면 동의 없이 서비스 내 콘텐츠를 복제, 전송,
              출판, 배포, 방송 등의 방법으로 이용하거나 제3자에게 이용하게 할 수
              없습니다.
            </NumberedItem>
            <NumberedItem>
              저작권 표시 "Copyright © 2025 SMC101"은 웹 사이트 하단에 상시
              노출됩니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제12조 (면책 조항)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중단 등
              불가항력적인 사유로 서비스를 제공할 수 없는 경우에는 책임이
              면제됩니다.
            </NumberedItem>
            <NumberedItem>
              회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대해서는 책임을
              지지 않습니다.
            </NumberedItem>
            <NumberedItem>
              회사는 이용자가 서비스를 통해 얻은 정보 또는 자료 등으로 인해
              발생한 손해에 대해 책임을 지지 않습니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제13조 (준거법 및 관할법원)</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              본 약관의 해석 및 회사와 이용자 간의 분쟁에 대해서는 대한민국
              법령을 적용합니다.
            </NumberedItem>
            <NumberedItem>
              서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우, 회사의
              주소지를 관할하는 법원을 전속관할법원으로 합니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>제14조 (기타)</PolicySubtitle>
          <PolicyText>
            본 약관에 명시되지 않은 사항은 관련 법령 및 회사가 정한 서비스 운영
            정책에 따릅니다.
          </PolicyText>
        </Section>

        <Section>
          <PolicyText>
            <Bold>시행일자: 2025년 03월 01일</Bold>
          </PolicyText>
        </Section>
      </ModalContent>
    </ModalContainer>
  );
};

export default TermsofUseModal;

// 스타일 컴포넌트
const ModalContainer = styled.div<{ $animationOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 2000;
  transform: translateY(${(props) => (props.$animationOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;

// 이용약관 스타일
const PolicyTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const PolicySubtitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const PolicyText = styled.p`
  margin-bottom: 10px;
`;

const PolicyList = styled.ul`
  margin-bottom: 15px;
  padding-left: 20px;
`;

const PolicyListItem = styled.li`
  margin-bottom: 5px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const NumberedList = styled.ol`
  padding-left: 20px;
  margin-bottom: 15px;
`;

const NumberedItem = styled.li`
  margin-bottom: 10px;
`;

const Bold = styled.span`
  font-weight: bold;
`;
