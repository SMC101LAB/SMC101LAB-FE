import { ErrorText, Input, InputWrapper, LoginButton } from './Style';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authAPI, JoinFormType } from '../../../apis/Auth';
import styled from 'styled-components';
import PrivacyPolicyModal from '../../MapPage/components/map/PrivacyPolicyModal';
import TermsofUseModal from '../../MapPage/components/map/TermsofUseModal';
import { useNotificationStore } from '../../../hooks/notificationStore';

interface joinPropsType {
  completeJoin: () => void;
}
const Join = ({ completeJoin }: joinPropsType) => {
  const [joinForm, setJoinForm] = useState<JoinFormType>({
    name: '',
    phone: '',
    organization: '',
    password: '',
  });
  const [pwCheck, setPwCheck] = useState<string>('');
  const [pwVerfiy, setPwVerify] = useState<boolean>(true);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
  });
  const [agreementError, setAgreementError] = useState<boolean>(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermofUseOpen, setIsTermofUseOpen] = useState(false);
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setJoinForm((prev) => ({
        ...prev,
        phone: value.toString(),
      }));
    } else {
      setJoinForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // console.log(joinForm);
  };

  const handlePwCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== joinForm.password) setPwVerify(false);
    else setPwVerify(true);
    setPwCheck(e.target.value);
  };

  // 전체 동의 처리 함수
  const handleAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAgreements({
      all: checked,
      terms: checked,
      privacy: checked,
    });
    if (checked) {
      setAgreementError(false);
    }
  };

  // 개별 동의 처리 함수
  const handleSingleAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    const newAgreements = {
      ...agreements,
      [name]: checked,
    };

    // 모든 개별 약관이 체크되었는지 확인하여 전체 동의 상태 업데이트
    const allChecked = newAgreements.terms && newAgreements.privacy;
    newAgreements.all = allChecked;

    setAgreements(newAgreements);

    if (newAgreements.terms && newAgreements.privacy) {
      setAgreementError(false);
    }
  };

  const joinMutation = useMutation({
    mutationFn: (data: JoinFormType) => authAPI.join(data),
    onSuccess: () => {
      showNotification('회원가입 완료! 관리자의 승인 후 로그인이 가능합니다.', {
        severity: 'success',
      });
      setJoinForm({
        name: '',
        phone: '',
        organization: '',
        password: '',
      });
      setPwCheck('');
      // 동의 상태 초기화
      setAgreements({
        all: false,
        terms: false,
        privacy: false,
      });
      completeJoin();
    },
    onError: (error: any) => {
      const errorMes =
        error.response?.data?.message ||
        '회원가입에 실패했습니다. 다시 시도해주세요.';
      showNotification(errorMes, { severity: 'error', autoHideDuration: 6000 });
      console.error('join Error:', error);
    },
  });

  const onSubmit = () => {
    const isFormFilled = Object.values(joinForm).every((value) => value !== '');
    const isAgreementsChecked = agreements.terms && agreements.privacy;

    if (!isAgreementsChecked) {
      setAgreementError(true);
    }

    if (pwVerfiy && isFormFilled && isAgreementsChecked) {
      joinMutation.mutate(joinForm);
    } else {
      showNotification('정보를 정확히 입력하고 필수 약관에 동의해주세요.', {
        severity: 'error',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <>
      <InputWrapper>
        <Input
          name="name"
          value={joinForm.name}
          onChange={handleChange}
          placeholder="이름"
        />
        <Input
          name="organization"
          value={joinForm.organization}
          onChange={handleChange}
          placeholder="소속"
        />
        <Input
          type="number"
          name="phone"
          value={joinForm.phone}
          onChange={handleChange}
          placeholder="전화번호"
          onKeyDown={(e) => {
            if (e.key === '-' || e.key === '+' || e.key === 'e') {
              e.preventDefault();
              setIsPhoneValid(false);
              setTimeout(() => setIsPhoneValid(true), 2000);
            }
          }}
        />
        {!isPhoneValid && (
          <ErrorText>"-"를 제외한 숫자만 입력해 주세요</ErrorText>
        )}
        <Input
          name="password"
          value={joinForm.password}
          onChange={handleChange}
          placeholder="비밀번호"
          type="password"
        />
        <Input
          name="pwCheck"
          value={pwCheck}
          onChange={handlePwCheckChange}
          placeholder="비밀번호 확인"
          type="password"
          onKeyDown={handleKeyDown}
        />
        {!pwVerfiy && <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>}
        <AllAgreeWrapper>
          <AllAgreeText>전체 동의</AllAgreeText>
          <AgreeCheckBox
            checked={agreements.all}
            onChange={handleAllAgree}
            type="checkbox"
          />
        </AllAgreeWrapper>
        <AgreeWrapper>
          <EssentialText>필수</EssentialText>
          <AgreeContent onClick={() => setIsTermofUseOpen(true)}>
            이용약관 &nbsp; &gt;
          </AgreeContent>
          <AgreeCheckBox
            name="terms"
            checked={agreements.terms}
            onChange={handleSingleAgree}
            type="checkbox"
          />
        </AgreeWrapper>
        <AgreeWrapper>
          <EssentialText>필수</EssentialText>
          <AgreeContent onClick={() => setIsPrivacyPolicyOpen(true)}>
            개인정보 수집 및 이용동의 &nbsp; &gt;
          </AgreeContent>
          <AgreeCheckBox
            name="privacy"
            checked={agreements.privacy}
            onChange={handleSingleAgree}
            type="checkbox"
          />
        </AgreeWrapper>
        {agreementError && (
          <ErrorText>필수 약관에 모두 동의해주세요.</ErrorText>
        )}
        <LoginButton onClick={onSubmit}>회원가입</LoginButton>
      </InputWrapper>

      <TermsofUseModal
        isOpen={isTermofUseOpen}
        onClose={() => setIsTermofUseOpen(false)}
      />
      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
    </>
  );
};

export default Join;

const AllAgreeWrapper = styled.div`
  display: flex;
  padding: 10px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[700]};
`;
const AllAgreeText = styled.div`
  flex: 1;
  font-size: ${({ theme }) => theme.fonts.sizes.ml};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const AgreeWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px 10px;
`;
const EssentialText = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const AgreeContent = styled.div`
  flex: 1;
  cursor: pointer;
`;
const AgreeCheckBox = styled.input`
  width: 20px;
`;
