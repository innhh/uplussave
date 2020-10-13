import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import { Stepper, Step, StepLabel, StepContent, Backdrop, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import emailjs from "emailjs-com";
import {
    callplanOptions,
    hpcolorOptions,
    pay_gubunOptions,
    pay_methodOptions,
    paper_methodOptions,
} from "./utils/constants";
import SnackAlert from "./components/SnackAlert";
import Header from "./components/Header";
import BasicInfo from "./components/steps/BasicInfo";
import ApplicantInfo from "./components/steps/ApplicantInfo";
import FeeInfo from "./components/steps/FeeInfo";
import DeliveryInfo from "./components/steps/DeliveryInfo";
import RecieptInfo from "./components/steps/RecieptInfo";
import ContractInfo from "./components/steps/ContractInfo";
import Success from "./components/Success";

const Container = styled.div`
    margin: auto;
    max-width: 500px;
    margin-bottom: 2rem;
`;

const AlertMessage = styled(Alert)`
    font-size: 0.7rem !important;
    padding-top: 3px !important;
    padding-bottom: 3px !important;
`;

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

function App() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completeSteps, setCompleteSteps] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [backDropOpen, setBackDropOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [applyData, setApplyData] = useState({
        callplan: callplanOptions[0], //요금제
        hpcolor: hpcolorOptions[0], //옵션
        conditionCheck: false, //판매조건 안내사항 동의
        uname: "", //가입자명
        birth: "", //생년월일
        hp2: "", //비상연락처
        email: "", //이메일
        zip: "", //우편번호
        addr1: "", //주소1
        addr2: "", //주소2
        hpnumber1: "", //희망번호 4자리
        hpnumber2: "", //희망번호 4자리
        hpnumber3: "", //희망번호 4자리
        memo: "", //추가 요청사항
        minor: "성인", //미성년자 여부
        parent: "", //법정대리인 이름
        parent_birth: "", //법정대리인 생년월일
        parent_tel: "", //법정대리인 연락처
        parent_rel: "", //가입자와의 관계
        pay_gubun: pay_gubunOptions[0], //요금청구 방법
        pay_method: pay_methodOptions[0], //요금확인 방법
        paddr_copy: false, //요금청구 주소 복사여부
        pzip: "", //요금청구 우편번호
        paddr1: "", //요금청구 주소1
        paddr2: "", //요금청구 주소2
        bank: "", //은행명
        banknum: "", //계좌번호
        bankowner: "", //예금주
        owner_real: "", //가입자와의 관계
        owner_birth: "", //예금주 생년월일
        rname: "", //수령인
        rhp: "", //배송지 연락처
        raddr_copy: false, //요금청구 주소 복사여부
        rzip: "", //요금청구 우편번호
        raddr1: "", //요금청구 주소1
        raddr2: "", //요금청구 주소2
        paper_method: paper_methodOptions[0], //구비서류 접수방법
        contractCheck: false, //약정관련 동의
        privateInfoCheck: false, //약관 동의서 및 개인정보 취급방침
        deputyCheck: false, //가입신청서 대필
    });

    const regist_form = useRef(null);

    const movePrev = () => {
        completeSteps[activeStep] = false;
        completeSteps[activeStep - 1] = false;
        setCompleteSteps(completeSteps);
        setActiveStep(activeStep - 1);
    };
    const moveNext = () => {
        completeSteps[activeStep] = true;
        setCompleteSteps(completeSteps);
        setActiveStep(activeStep + 1);
    };

    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertOpen(true);
    };
    const finish = () => {
        if (!window.confirm("입력하신 내용으로 신청하시겠습니까?")) {
            return;
        }

        setBackDropOpen(true);
        emailjs.sendForm("service_78f2lfo", "template_7lx0n2f", regist_form.current).then(
            function (response) {
                setBackDropOpen(false);
                setIsSuccess(true);
            },
            function (error) {
                window.alert("신청이 실패했습니다. 다시 시도해 주시거나 고객센터 문의바랍니다.");
                setBackDropOpen(false);
            }
        );
    };

    function onChangeFile(index, e) {
        const id = `b_file${index}`;
        const $form = $(regist_form.current);
        const $cloneFile = $(e.target).clone();
        $cloneFile.attr("id", id);

        const $prevFile = $("#" + id);
        $prevFile && $prevFile.remove();

        $form.append($cloneFile);
    }

    //emailjs 초기화
    useEffect(() => {
        emailjs.init("user_0nGKbHBBBnrcCZKwoXeAj");
    }, []);

    return (
        <Container>
            <Header></Header>

            {isSuccess ? (
                <Success></Success>
            ) : (
                <>
                    <AlertMessage severity="success">
                        작성하신 정보는 상담 및 접수 확인 외에 다른 용도로 사용되지 않습니다
                    </AlertMessage>

                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step completed={completeSteps[0]}>
                            <StepLabel>기본정보</StepLabel>
                            <StepContent>
                                <BasicInfo
                                    applyData={applyData}
                                    setApplyData={setApplyData}
                                    moveNext={moveNext}
                                    showAlert={showAlert}
                                ></BasicInfo>
                            </StepContent>
                        </Step>

                        <Step completed={completeSteps[1]}>
                            <StepLabel>가입자 정보</StepLabel>
                            <StepContent>
                                <ApplicantInfo
                                    applyData={applyData}
                                    setApplyData={setApplyData}
                                    movePrev={movePrev}
                                    moveNext={moveNext}
                                    showAlert={showAlert}
                                ></ApplicantInfo>
                            </StepContent>
                        </Step>

                        <Step completed={completeSteps[2]}>
                            <StepLabel>요금청구 정보</StepLabel>
                            <StepContent>
                                <FeeInfo
                                    applyData={applyData}
                                    setApplyData={setApplyData}
                                    movePrev={movePrev}
                                    moveNext={moveNext}
                                    showAlert={showAlert}
                                ></FeeInfo>
                            </StepContent>
                        </Step>

                        <Step completed={completeSteps[3]}>
                            <StepLabel>배송 정보</StepLabel>
                            <StepContent>
                                <DeliveryInfo
                                    applyData={applyData}
                                    setApplyData={setApplyData}
                                    movePrev={movePrev}
                                    moveNext={moveNext}
                                    showAlert={showAlert}
                                ></DeliveryInfo>
                            </StepContent>
                        </Step>

                        <Step completed={completeSteps[4]}>
                            <StepLabel>구비서류 접수</StepLabel>
                            <StepContent>
                                <RecieptInfo
                                    applyData={applyData}
                                    setApplyData={setApplyData}
                                    movePrev={movePrev}
                                    moveNext={moveNext}
                                    showAlert={showAlert}
                                    onChangeFile={onChangeFile}
                                ></RecieptInfo>
                            </StepContent>
                        </Step>

                        <Step completed={completeSteps[5]}>
                            <StepLabel>신청완료</StepLabel>
                            <StepContent>
                                <ContractInfo
                                    applyData={applyData}
                                    setApplyData={setApplyData}
                                    movePrev={movePrev}
                                    finish={finish}
                                    showAlert={showAlert}
                                ></ContractInfo>
                            </StepContent>
                        </Step>
                    </Stepper>
                </>
            )}

            <SnackAlert open={alertOpen} setOpen={setAlertOpen} message={alertMessage}></SnackAlert>

            <Backdrop open={backDropOpen} className={classes.backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <form id="regist_form" ref={regist_form} style={{ display: "none" }}>
                <input type="hidden" name="callplan" value={applyData.callplan}></input>
                <input type="hidden" name="hpcolor" value={applyData.hpcolor}></input>
                <input type="hidden" name="uname" value={applyData.uname}></input>
                <input type="hidden" name="birth" value={applyData.birth}></input>
                <input type="hidden" name="hp2" value={applyData.hp2}></input>
                <input type="hidden" name="email" value={applyData.email}></input>
                <input type="hidden" name="zip" value={applyData.zip}></input>
                <input type="hidden" name="addr1" value={applyData.addr1}></input>
                <input type="hidden" name="addr2" value={applyData.addr2}></input>
                <input type="hidden" name="hpnumber1" value={applyData.hpnumber1}></input>
                <input type="hidden" name="hpnumber2" value={applyData.hpnumber2}></input>
                <input type="hidden" name="hpnumber3" value={applyData.hpnumber3}></input>
                <input type="hidden" name="memo" value={applyData.memo}></input>
                <input type="hidden" name="minor" value={applyData.minor}></input>
                <input type="hidden" name="parent" value={applyData.parent}></input>
                <input type="hidden" name="parent_birth" value={applyData.parent_birth}></input>
                <input type="hidden" name="parent_tel" value={applyData.parent_tel}></input>
                <input type="hidden" name="parent_rel" value={applyData.parent_rel}></input>
                <input type="hidden" name="pay_gubun" value={applyData.pay_gubun}></input>
                <input type="hidden" name="pay_method" value={applyData.pay_method}></input>
                <input type="hidden" name="pzip" value={applyData.pzip}></input>
                <input type="hidden" name="paddr1" value={applyData.paddr1}></input>
                <input type="hidden" name="paddr2" value={applyData.paddr2}></input>
                <input type="hidden" name="bank" value={applyData.bank}></input>
                <input type="hidden" name="banknum" value={applyData.banknum}></input>
                <input type="hidden" name="bankowner" value={applyData.bankowner}></input>
                <input type="hidden" name="owner_real" value={applyData.owner_real}></input>
                <input type="hidden" name="owner_birth" value={applyData.owner_birth}></input>
                <input type="hidden" name="rname" value={applyData.rname}></input>
                <input type="hidden" name="rhp" value={applyData.rhp}></input>
                <input type="hidden" name="rzip" value={applyData.rzip}></input>
                <input type="hidden" name="raddr1" value={applyData.raddr1}></input>
                <input type="hidden" name="raddr2" value={applyData.raddr2}></input>
                <input type="hidden" name="paper_method" value={applyData.paper_method}></input>
                <input type="hidden" name="conditionCheck" value={applyData.conditionCheck}></input>
                <input type="hidden" name="contractCheck" value={applyData.contractCheck}></input>
                <input type="hidden" name="privateInfoCheck" value={applyData.privateInfoCheck}></input>
                <input type="hidden" name="deputyCheck" value={applyData.deputyCheck}></input>

                <input type="file" id="b_file0" name="b_file0" style={{ marginTop: "0.3rem" }}></input>
                <input type="file" id="b_file1" name="b_file1" style={{ marginTop: "0.3rem" }}></input>
                <input type="file" id="b_file2" name="b_file2" style={{ marginTop: "0.3rem" }}></input>
            </form>
        </Container>
    );
}

export default App;
