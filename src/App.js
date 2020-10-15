import React, { useState } from "react";
import { Stepper, Step, StepLabel, StepContent, Backdrop, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import $ from "jquery";
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
    const [activeStep, setActiveStep] = useState(4);
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
        b_files: [], //첨부파일
    });

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

        const formData = new FormData();
        formData.append("callplan", applyData.callplan);
        formData.append("hpcolor", applyData.hpcolor);
        formData.append("uname", applyData.uname);
        formData.append("birth", applyData.birth);
        formData.append("hp2", applyData.hp2);
        formData.append("email", applyData.email);
        formData.append("zip", applyData.zip);
        formData.append("addr1", applyData.addr1);
        formData.append("addr2", applyData.addr2);
        formData.append("hpnumber1", applyData.hpnumber1);
        formData.append("hpnumber2", applyData.hpnumber2);
        formData.append("hpnumber3", applyData.hpnumber3);
        formData.append("memo", applyData.memo);
        formData.append("minor", applyData.minor);
        formData.append("parent", applyData.parent);
        formData.append("parent_birth", applyData.parent_birth);
        formData.append("parent_tel", applyData.parent_tel);
        formData.append("parent_rel", applyData.parent_rel);
        formData.append("pay_gubun", applyData.pay_gubun);
        formData.append("pay_method", applyData.pay_method);
        formData.append("pzip", applyData.pzip);
        formData.append("paddr1", applyData.paddr1);
        formData.append("paddr2", applyData.paddr2);
        formData.append("bank", applyData.bank);
        formData.append("banknum", applyData.banknum);
        formData.append("bankowner", applyData.bankowner);
        formData.append("owner_real", applyData.owner_real);
        formData.append("owner_birth", applyData.owner_birth);
        formData.append("rname", applyData.rname);
        formData.append("rhp", applyData.rhp);
        formData.append("rzip", applyData.rzip);
        formData.append("raddr1", applyData.raddr1);
        formData.append("raddr2", applyData.raddr2);
        formData.append("paper_method", applyData.paper_method);
        formData.append("conditionCheck", applyData.conditionCheck);
        formData.append("contractCheck", applyData.contractCheck);
        formData.append("privateInfoCheck", applyData.privateInfoCheck);
        formData.append("deputyCheck", applyData.deputyCheck);

        if (applyData.paper_method === "파일첨부") {
            applyData.b_files.forEach((b_file, index) => {
                formData.append(`b_file${index}`, b_file.file, b_file.file.name);
            });
        }

        formData.append("service_id", "service_78f2lfo");
        formData.append("template_id", "template_7lx0n2f");
        formData.append("user_id", "user_0nGKbHBBBnrcCZKwoXeAj");

        $.ajax("https://api.emailjs.com/api/v1.0/email/send-form", {
            type: "POST",
            data: formData,
            contentType: false, // auto-detection
            processData: false, // no need to parse formData to string
        })
            .done(function () {
                setBackDropOpen(false);
                setIsSuccess(true);
            })
            .fail(function (error) {
                window.alert("신청이 실패했습니다. 다시 시도해 주시거나 고객센터 문의바랍니다.");
                setBackDropOpen(false);
            });
    };

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
                                    setBackDropOpen={setBackDropOpen}
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
        </Container>
    );
}

export default App;
