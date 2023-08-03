import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
//import InputForm from "../../components/InputForm.jsx";
import BackButton from "../../assets/images/getback.png";
import SignUpHeader from "../../components/HeaderComponent";
import TermsAgreement from "../../components/TermsAgreement";


// const EmailInput = styled(InputForm)`
//   //혹시 몰라서 일단 스타일 넣어둠.
// `;

const CheckboxContainer = styled.div`
  display: block;
  position: relative;
  padding-left: 0px;
  cursor: pointer;
  user-select: none;
  padding-bottom: 15px;
  margin-top: 10px;
  margin-left: -27px;
`;

const CheckboxItem = styled.div`
  border-bottom: ${(props) =>
    props.border === true ? "1px solid black" : "none"};
  padding-bottom: 6px;
  margin-top: 10px;
  width: 400px;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;

  &:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 18px;
    height: 18px;
    border: 1px solid #667080;
    border-radius: 3px;
  }

  ${CheckboxInput}:checked ~ &:before {
    background-color: #667080;
  }

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

  ${CheckboxInput}:checked ~ &:after {
    display: block;
    left: 9px;
    top: 13px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

// 이메일 라벨을 위한 스타일 컴포넌트
const EmailLabel = styled.label`
  font-family: NanumGothic;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.02em;
  text-align: left;
  color: #151515;
  margin-top: 20px;
`;

const EmailInputField = styled.input`
  width: 329px;
  height: 40px;
  top: 340px;
  left: 23px;
  border-radius: 5px;
  border: 1px solid
    ${(props) => (props.invalidEmail ? "#D94A56" : "transparent")}; // 경계선 색상 설정
`;

const InvalidEmailMessage = styled.p`
  color: #d94a56;
  margin-top: 5px;
  font-size: 14px;
`;

const BottomBox = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 84px;
  background-color: #667080;
  color: white;
  text-align: center;
  position: absolute;
  bottom: 0;
  text-decoration: none;
  margin-left: -50px;
  opacity: ${(props) => (props.active ? "1" : "0.5")};
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
`;

/*const SignupContainer = styled.div`
  // 여기에 필요한 CSS를 추가하세요
`;*/

const PasswordInput = styled.input`
  width: 329px;
  height: 40px;
  top: 340px;
  left: 23px;
  border-radius: 5px;
  border: 1px solid
    ${(props) => (props.invalidEmail ? "#D94A56" : "transparent")};
`;

const RequirementsContainer = styled.div`
  font-family: "Nanum Gothic";
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  margin-top: -30px;
`;

const RequirementText = styled.span`
  font-family: "Nanum Gothic";
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => (props.$isValid ? "green" : "red")};
  margin-right: 10px;
  font-weight: 500;
`;

const ConfirmationText = styled.span`
  font-family: "Nanum Gothic";
  font-weight: 500;
  font-size: 14px;
  color: ${(props) =>
    props.$isValid === null ? "red" : props.$isValid ? "green" : "red"};
  margin-top: -30px;
`;

function SignupPage() {
  const [agree, setAgree] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [lengthRequirement, setLengthRequirement] = useState(false);
  const [letterRequirement, setLetterRequirement] = useState(false);
  const [numberRequirement, setNumberRequirement] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setLengthRequirement(passwordValue.length >= 8);
    setLetterRequirement(/[a-zA-Z]/.test(passwordValue));
    setNumberRequirement(/\d/.test(passwordValue));
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  useEffect(() => {
    const checkPassword = (password, passwordCheck) => {
      const matchRequirement = password === passwordCheck;
      setIsValid(
        lengthRequirement &&
          letterRequirement &&
          numberRequirement &&
          matchRequirement,
      );
      setIsPasswordMatch(password && passwordCheck ? matchRequirement : null);
    };

    checkPassword(password, passwordCheck);
  }, [
    password,
    passwordCheck,
    lengthRequirement,
    letterRequirement,
    numberRequirement,
  ]);

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const toggleCheckboxTerms = () => {
    const newAgreeTermsState = !agreeTerms;
    setAgreeTerms(newAgreeTermsState);
    if (!newAgreeTermsState) setAgree(false);
  };

  const toggleCheckboxPrivacy = () => {
    const newAgreePrivacyState = !agreePrivacy;
    setAgreePrivacy(newAgreePrivacyState);
    if (!newAgreePrivacyState) setAgree(false);
  };

  const toggleCheckboxMarketing = () => {
    const newAgreeMarketingState = !agreeMarketing;
    setAgreeMarketing(newAgreeMarketingState);
    if (!newAgreeMarketingState) setAgree(false);
  };

  const navigate = useNavigate();

  const toggleCheckbox = () => {
    const newAgreeState = !agree;
    setAgree(newAgreeState);
    setAgreeTerms(newAgreeState);
    setAgreePrivacy(newAgreeState);
    setAgreeMarketing(newAgreeState);
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (agreeTerms && agreePrivacy) {
      navigate("/password");
    }
  };

  return (
    <PageContainer>
      <Header>
        <Link to="/">
          <BackButtonImage src={BackButton} alt="Back" />
        </Link>
        <HeaderTitle>회원가입</HeaderTitle>
      </Header>
      <TermsAgreeTitle>약관 동의</TermsAgreeTitle>
      <CheckboxContainer>
        <CheckboxItem border>
          <CheckboxInput
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={toggleCheckbox}
          />
          <CheckboxLabel htmlFor="agree"> 전체 약관 동의</CheckboxLabel>
        </CheckboxItem>
        <CheckboxItem>
          <CheckboxInput
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={toggleCheckboxTerms}
          />
          <CheckboxLabel htmlFor="terms">[필수] 서비스 이용 약관</CheckboxLabel>
        </CheckboxItem>
        <CheckboxItem>
          <CheckboxInput
            type="checkbox"
            id="privacy"
            checked={agreePrivacy}
            onChange={toggleCheckboxPrivacy}
          />
          <CheckboxLabel htmlFor="privacy">
            [필수] 개인정보 수집 및 이용
          </CheckboxLabel>
        </CheckboxItem>
        <CheckboxItem>
          <CheckboxInput
            type="checkbox"
            id="marketing"
            checked={agreeMarketing}
            onChange={toggleCheckboxMarketing}
          />
          <CheckboxLabel htmlFor="marketing">
            혜택 및 마케팅 정보 수신 동의
          </CheckboxLabel>
        </CheckboxItem>
      </CheckboxContainer>
      <EmailLabel>이메일</EmailLabel>
      <EmailInputField
        placeholder="이메일 주소를 입력하세요."
        type="email"
        onChange={handleEmailChange}
        value={email}
        invalidEmail={invalidEmail}
      />
      {invalidEmail && (
        <InvalidEmailMessage>
          이메일 형식을 다시 확인해주세요
        </InvalidEmailMessage>
      )}
      <PasswordInput
        label="비밀번호"
        placeholder="비밀번호를 입력하세요."
        type="password"
        onChange={handlePasswordChange}
        value={password}
      />
      <RequirementsContainer>
        <RequirementText $isValid={lengthRequirement}>
          8자 이상 {lengthRequirement ? "✓" : ""}
        </RequirementText>
        <RequirementText $isValid={letterRequirement}>
          영문 포함 {letterRequirement ? "✓" : ""}
        </RequirementText>
        <RequirementText $isValid={numberRequirement}>
          숫자 포함 {numberRequirement ? "✓" : ""}
        </RequirementText>
      </RequirementsContainer>
      <PasswordInput
        label="비밀번호 확인"
        placeholder="비밀번호를 입력하세요."
        type="password"
        onChange={handlePasswordCheckChange}
        value={passwordCheck}
      />
      <ConfirmationText $isValid={isPasswordMatch}>
        비밀번호 확인{" "}
        {isPasswordMatch !== null ? (isPasswordMatch ? "✓" : "") : ""}
      </ConfirmationText>
      <BottomBox
        to="/"
        onClick={handleNextClick}
        active={agreeTerms && agreePrivacy && isValid ? 1 : 0}
      >
        다음
      </BottomBox>
    </PageContainer>
  );
}
export default SignupPage;
