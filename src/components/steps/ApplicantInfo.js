import React from "react";
import { FormControlLabel, Switch, Collapse } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import palette from "../../utils/palette";
import MoveSteps from "../MoveSteps";
import InputControl from "../InputControl";
import SearchAddress from "../SearchAddress";

const SubContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SubTitle = styled.div`
    font-size: 0.8rem;
    color: ${palette.gray};
    margin-top: 2rem;
`;

const StyledFormControlLabel = withStyles({
    root: {
        color: palette.gray,
        marginTop: "0.5rem",
        marginLeft: "0",
        "& .MuiTypography-body1": {
            fontSize: "0.9rem",
        },
    },
})(FormControlLabel);

const ApplicantInfo = ({ applyData, setApplyData, movePrev, moveNext, showAlert }) => {
    const validate = () => {
        if (!applyData.uname) {
            showAlert("가입자명을 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.birth) {
            showAlert("생년월일(6자리)를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.hp2) {
            showAlert("비상연락처(해피콜 받을 번호)를 입력해 주시기 바랍니다");
            return false;
        }
        if (!emailCheck(applyData.email)) {
            showAlert("올바른 이메일을 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.zip) {
            showAlert("우편번호를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.addr1) {
            showAlert("주소를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.addr2) {
            showAlert("상세주소를 입력해 주시기 바랍니다");
            return false;
        }

        return true;
    };
    const emailCheck = (email_address) => {
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if (!email_regex.test(email_address)) {
            return false;
        } else {
            return true;
        }
    };
    const applyOf = (key) => (x) => setApplyData({ ...applyData, [key]: x });
    const handleAddress = (zip, addr) => {
        setApplyData({ ...applyData, zip: zip, addr1: addr });
    };
    const handleMinor = (e) => {
        setApplyData({ ...applyData, minor: e.target.checked ? "미성년자" : "성인" });
    };

    return (
        <>
            <InputControl
                name="uname"
                label="가입자명*"
                value={applyData.uname}
                onChange={applyOf("uname")}
                maxLength="20"
            ></InputControl>
            <InputControl
                name="birth"
                label="생년월일(6자리)* 예) 800516"
                value={applyData.birth}
                onChange={applyOf("birth")}
                maxLength="6"
                numberOnly
            ></InputControl>
            <InputControl
                name="hp2"
                label="비상연락처(해피콜 받을 번호)*"
                value={applyData.hp2}
                onChange={applyOf("hp2")}
                phoneNumber
            ></InputControl>
            <InputControl
                name="email"
                label="이메일*"
                value={applyData.email}
                onChange={applyOf("email")}
                maxLength="50"
            ></InputControl>

            <SubTitle>가입자 주소</SubTitle>
            <SubContainer>
                <InputControl
                    name="zip"
                    label="우편번호*"
                    value={applyData.zip}
                    onChange={applyOf("zip")}
                    maxLength="20"
                    numberOnly
                ></InputControl>
                <SearchAddress onComplete={handleAddress}></SearchAddress>
            </SubContainer>

            <InputControl
                name="addr1"
                label="주소*"
                value={applyData.addr1}
                onChange={applyOf("addr1")}
                maxLength="100"
            ></InputControl>
            <InputControl
                name="addr2"
                label="상세주소*"
                value={applyData.addr2}
                onChange={applyOf("addr2")}
                maxLength="100"
            ></InputControl>

            <SubTitle>희망번호 4자리</SubTitle>
            <SubContainer>
                <InputControl
                    name="hpnumber1"
                    label="1순위"
                    value={applyData.hpnumber1}
                    onChange={applyOf("hpnumber1")}
                    maxLength="4"
                    numberOnly
                    marginleft
                ></InputControl>
                <InputControl
                    name="hpnumber2"
                    label="2순위"
                    value={applyData.hpnumber2}
                    onChange={applyOf("hpnumber2")}
                    maxLength="4"
                    numberOnly
                ></InputControl>
                <InputControl
                    name="hpnumber3"
                    label="3순위"
                    value={applyData.hpnumber3}
                    onChange={applyOf("hpnumber3")}
                    maxLength="4"
                    numberOnly
                ></InputControl>
            </SubContainer>
 
            <InputControl
                name="memo"
                label="추가 요청사항"
                value={applyData.memo}
                onChange={applyOf("memo")}
                multiline
                maxLength="200"
            ></InputControl>
 
            <StyledFormControlLabel
                control={<Switch name="minor" checked={applyData.minor === "미성년자"} onChange={handleMinor} color="secondary" />}
                label="미성년자 여부"
                labelPlacement="start"
            />
            <Collapse in={applyData.minor === "미성년자"}>
                <InputControl
                    name="parent"
                    label="법정대리인 이름"
                    value={applyData.parent}
                    onChange={applyOf("parent")}
                    maxLength="20"
                ></InputControl>
                <InputControl
                    name="parent_birth"
                    label="법정대리인 생년월일"
                    value={applyData.parent_birth}
                    onChange={applyOf("parent_birth")}
                    maxLength="6"
                    numberOnly
                ></InputControl>
                <InputControl
                    name="parent_tel"
                    label="법정대리인 연락처"
                    value={applyData.parent_tel}
                    onChange={applyOf("parent_tel")}
                    phoneNumber
                ></InputControl>
                <InputControl
                    name="parent_rel"
                    label="가입자와의 관계"
                    value={applyData.parent_rel}
                    onChange={applyOf("parent_rel")}
                    maxLength="20"
                ></InputControl>
            </Collapse>

            <MoveSteps movePrev={movePrev} moveNext={moveNext} validate={validate}></MoveSteps>
        </>
    );
};

export default ApplicantInfo;
