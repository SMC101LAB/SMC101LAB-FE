import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
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
        <HeaderTitle>개인정보 처리방침</HeaderTitle>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </ModalHeader>
      <ModalContent>
        <PolicyTitle>SMC101LAB 개인정보 처리방침</PolicyTitle>

        <PolicyText>
          SMC101LAB(이하 '개인정보처리자')은(는) 정보주체의 자유와 권리 보호를
          위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게
          개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보
          보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및
          기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록
          하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        </PolicyText>

        <PolicySubtitle>목차</PolicySubtitle>
        <PolicyList>
          <PolicyListItem>개인정보의 처리 목적</PolicyListItem>
          <PolicyListItem>처리하는 개인정보의 항목</PolicyListItem>
          <PolicyListItem>개인정보의 처리 및 보유 기간</PolicyListItem>
          <PolicyListItem>
            정보주체와 법정대리인의 권리·의무 및 행사방법
          </PolicyListItem>
          <PolicyListItem>개인정보의 파기절차 및 파기방법</PolicyListItem>
          <PolicyListItem>개인정보의 안전성 확보조치</PolicyListItem>
          <PolicyListItem>
            개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
          </PolicyListItem>
          <PolicyListItem>개인정보 보호책임자</PolicyListItem>
          <PolicyListItem>권익침해 구제방법</PolicyListItem>
          <PolicyListItem>개인정보 처리방침의 변경</PolicyListItem>
        </PolicyList>

        <Section>
          <PolicySubtitle>개인정보의 처리 목적</PolicySubtitle>
          <PolicyText>
            개인정보처리자는 다음의 목적을 위하여 개인정보를 처리합니다.
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지
            않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에
            따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </PolicyText>
          <NumberedList>
            <NumberedItem>
              <Bold>회원 가입 및 관리</Bold>
              <PolicyText>
                회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증,
                회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지,
                고충처리 목적으로 개인정보를 처리합니다.
              </PolicyText>
            </NumberedItem>
            <NumberedItem>
              <Bold>급경사지 데이터 관리 및 시각화 서비스 제공</Bold>
              <PolicyText>
                급경사지 데이터의 수집, 관리, 분석, 시각화 서비스 제공, 콘텐츠
                제공, 맞춤서비스 제공 등을 목적으로 개인정보를 처리합니다.
              </PolicyText>
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>처리하는 개인정보의 항목</PolicySubtitle>
          <PolicyText>
            회사는 다음의 개인정보 항목을 처리하고 있습니다.
          </PolicyText>
          <NumberedList>
            <NumberedItem>
              <Bold>회원 가입 및 관리</Bold>
              <PolicyText>필수항목: 이름, 전화번호, 소속, 비밀번호</PolicyText>
            </NumberedItem>
            <NumberedItem>
              <Bold>서비스 이용 과정에서 수집되는 정보</Bold>
              <PolicyList>
                <PolicyListItem>
                  위치정보: 급경사지 데이터의 지도 표기를 위해 일시적으로만
                  사용되며 별도 저장되지 않습니다.
                </PolicyListItem>
                <PolicyListItem>
                  사진/이미지 정보: 급경사지 관련 게시글 작성 용도로만
                  사용됩니다.
                </PolicyListItem>
                <PolicyListItem>
                  서비스 이용기록, 접속 로그, 쿠키, IP 정보
                </PolicyListItem>
              </PolicyList>
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>개인정보의 처리 및 보유 기간</PolicySubtitle>
          <PolicyText>
            개인정보처리자는 법령에 따른 개인정보 보유·이용기간 또는
            정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간
            내에서 개인정보를 처리·보유합니다.
          </PolicyText>
          <NumberedList>
            <NumberedItem>
              <Bold>회원 가입 및 관리</Bold>
              <PolicyText>회원 탈퇴 시까지</PolicyText>
              <PolicyText>
                다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
              </PolicyText>
              <NumberedSubList>
                <NumberedSubItem>
                  관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당
                  수사·조사 종료 시까지
                </NumberedSubItem>
                <NumberedSubItem>
                  서비스 이용에 따른 채권·채무관계 잔존 시에는 해당
                  채권·채무관계 정산 시까지
                </NumberedSubItem>
              </NumberedSubList>
            </NumberedItem>
            <NumberedItem>
              <Bold>급경사지 데이터 관리 및 시각화 서비스 제공</Bold>
              <PolicyText>서비스 제공 기간</PolicyText>
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>
            정보주체와 법정대리인의 권리·의무 및 행사방법
          </PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              정보주체는 개인정보처리자에 대해 언제든지 개인정보
              열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
            </NumberedItem>
            <NumberedItem>
              권리 행사는 개인정보처리자에 대해 「개인정보 보호법」 시행령
              제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실
              수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.
            </NumberedItem>
            <NumberedItem>
              권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을
              통하여 하실 수도 있습니다. 이 경우 "개인정보 처리 방법에 관한
              고시(제2020-7호)" 별지 제11호 서식에 따른 위임장을 제출하셔야
              합니다.
            </NumberedItem>
            <NumberedItem>
              개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항,
              제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.
            </NumberedItem>
            <NumberedItem>
              개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집
              대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
            </NumberedItem>
            <NumberedItem>
              회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구,
              처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한
              대리인인지를 확인합니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>개인정보의 파기절차 및 파기방법</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              개인정보처리자는 개인정보 보유기간의 경과, 처리목적 달성 등
              개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
              파기합니다.
            </NumberedItem>
            <NumberedItem>
              정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이
              달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속
              보존하여야 하는 경우에는, 해당 개인정보를 별도의
              데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
            </NumberedItem>
            <NumberedItem>
              개인정보 파기의 절차 및 방법은 다음과 같습니다.
              <NumberedSubList>
                <NumberedSubItem>
                  <Bold>파기절차</Bold>
                  <PolicyText>
                    개인정보처리자는 파기 사유가 발생한 개인정보를 선정하고,
                    개인정보처리자의 개인정보 보호책임자의 승인을 받아
                    개인정보를 파기합니다.
                  </PolicyText>
                </NumberedSubItem>
                <NumberedSubItem>
                  <Bold>파기방법</Bold>
                  <PolicyList>
                    <PolicyListItem>
                      전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수
                      없도록 파기합니다.
                    </PolicyListItem>
                    <PolicyListItem>
                      종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나
                      소각하여 파기합니다.
                    </PolicyListItem>
                  </PolicyList>
                </NumberedSubItem>
              </NumberedSubList>
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>개인정보의 안전성 확보조치</PolicySubtitle>
          <PolicyText>
            개인정보처리자는 개인정보의 안전성 확보를 위해 다음과 같은 조치를
            취하고 있습니다.
          </PolicyText>
          <NumberedList>
            <NumberedItem>
              <Bold>관리적 조치</Bold>
              <PolicyText>
                내부관리계획 수립·시행, 정기적 직원 교육 등
              </PolicyText>
            </NumberedItem>
            <NumberedItem>
              <Bold>기술적 조치</Bold>
              <PolicyText>
                개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치,
                고유식별정보 등의 암호화, 보안프로그램 설치
              </PolicyText>
            </NumberedItem>
            <NumberedItem>
              <Bold>물리적 조치</Bold>
              <PolicyText>전산실, 자료보관실 등의 접근통제</PolicyText>
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>
            개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
          </PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              개인정보처리자는 이용자에게 개별적인 맞춤서비스를 제공하기 위해
              이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
            </NumberedItem>
            <NumberedItem>
              쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
              브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의
              하드디스크에 저장되기도 합니다.
              <PolicyList>
                <PolicyListItem>
                  <Bold>쿠키의 사용목적:</Bold> 이용자가 방문한 각 서비스와 웹
                  사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부,
                  등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
                </PolicyListItem>
                <PolicyListItem>
                  <Bold>쿠키의 설치·운영 및 거부:</Bold> 웹브라우저 상단의 도구
                  &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을 통해 쿠키
                  저장을 거부할 수 있습니다.
                </PolicyListItem>
                <PolicyListItem>
                  쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할
                  수 있습니다.
                </PolicyListItem>
              </PolicyList>
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>개인정보 보호책임자</PolicySubtitle>
          <NumberedList>
            <NumberedItem>
              개인정보처리자는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
              개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
              아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              <PolicyBox>
                <Bold>개인정보 보호책임자</Bold>
                <br />
                이름: 김도현
                <br />
                연락처: 01095665068
                <br />
                이메일: kdhqwe1030@gmail.com
              </PolicyBox>
            </NumberedItem>
            <NumberedItem>
              정보주체는 SMC101LAB 서비스를 이용하시면서 발생한 모든 개인정보
              보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보
              보호책임자에게 문의하실 수 있습니다. 개인정보처리자는 정보주체의
              문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>권익침해 구제방법</PolicySubtitle>
          <PolicyText>
            정보주체는 개인정보침해로 인한 구제를 받기 위하여
            개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에
            분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타
            개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기
            바랍니다.
          </PolicyText>
          <NumberedList>
            <NumberedItem>
              개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
            </NumberedItem>
            <NumberedItem>
              개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
            </NumberedItem>
            <NumberedItem>
              대검찰청 : (국번없이) 1301 (www.spo.go.kr)
            </NumberedItem>
            <NumberedItem>
              경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)
            </NumberedItem>
          </NumberedList>
        </Section>

        <Section>
          <PolicySubtitle>개인정보의 제3자 제공</PolicySubtitle>
          <PolicyText>
            개인정보처리자는 정보주체의 개인정보를 개인정보의 처리 목적에서
            명시한 범위 내에서만 처리하며, 다음의 경우를 제외하고는 정보주체의
            사전 동의 없이는 본래의 목적 범위를 초과하여 처리하거나 제3자에게
            제공하지 않습니다.
          </PolicyText>
          <NumberedList>
            <NumberedItem>정보주체로부터 별도의 동의를 받은 경우</NumberedItem>
            <NumberedItem>법률에 특별한 규정이 있는 경우</NumberedItem>
            <NumberedItem>
              정보주체 또는 법정대리인이 의사표시를 할 수 없는 상태에 있거나
              주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보주체
              또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고
              인정되는 경우
            </NumberedItem>
          </NumberedList>
          <PolicyText>
            ※ 서비스 이용자의 소속과 이름은 급경사지 데이터 관리 및 시각화
            서비스 내에서 다른 사용자에게 공개될 수 있습니다.
          </PolicyText>
        </Section>

        <Section>
          <PolicySubtitle>개인정보 처리방침의 변경</PolicySubtitle>
          <PolicyText>
            이 개인정보 처리방침은 2024년 2월 26일부터 적용됩니다.
          </PolicyText>
        </Section>
      </ModalContent>
    </ModalContainer>
  );
};

export default PrivacyPolicyModal;

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
  margin-top: 35px;
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

// 개인정보 처리방침 스타일
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

const NumberedSubList = styled.ol`
  padding-left: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
  list-style-type: lower-alpha;
`;

const NumberedSubItem = styled.li`
  margin-bottom: 5px;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const PolicyBox = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin: 10px 0;
`;
