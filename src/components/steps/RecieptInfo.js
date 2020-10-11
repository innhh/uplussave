import React from "react";
import { Collapse } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";
import SelectControl from "../SelectControl";
import { paper_methodOptions } from "../../utils/constants";
import MoveSteps from "../MoveSteps";
import DocChecker from "../DocChecker";
import idcard_correct from "../../image/idcard_correct.png";
import idcard_wrong from "../../image/idcard_wrong.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledUl = styled.ul`
    padding-inline-start: 0;
    font-size: 0.8rem;
`;

const StyledInput = styled.input`
    margin-top: 0.3rem;
`;

const StyledAlert = styled(Alert)`
    margin-top: 1rem;
`;

const SubContainer = styled.div`
    margin-top: 2rem;
`;

const RecieptInfo = ({ applyData, setApplyData, movePrev, showAlert, finish }) => {
    const validate = () => {
        if (!applyData.contractCheck) {
            showAlert("약정관련 안내를 확인해 주시기 바랍니다");
            return false;
        }
        if (!applyData.privateInfoCheck) {
            showAlert("약관 동의서 및 개인정보 취급방침에 동의해 주시기 바랍니다");
            return false;
        }
        return true;
    }
    const applyOf = (key) => (x) => setApplyData({ ...applyData, [key]: x });
    const handleMovePrev = () => {
        const isOk = window.confirm("첨부한 파일이 초기화됩니다. 이전으로 이동하시겠습니까?");
        if (isOk) {
            movePrev();
        }
    };
    const agreeWithContract = () => {
        setApplyData({ ...applyData, contractCheck: true });
    };
    const agreeWithPrivateInfo = () => {
        setApplyData({ ...applyData, privateInfoCheck: true });
    };

    return (
        <Container>
            <SelectControl
                name="paper_method"
                label="구비서류 접수방법*"
                options={paper_methodOptions}
                value={applyData.paper_method}
                onChange={applyOf("paper_method")}
            ></SelectControl>

            <Collapse in={applyData.paper_method === "파일첨부"}>
                <StyledInput type="file" name="b_file[]" maxLength="512000" />
                <StyledInput type="file" name="b_file[]" maxLength="512000" />
                <StyledInput type="file" name="b_file[]" maxLength="512000" />

                <StyledAlert severity="warning">
                    <div>구비서류 등록시 주의사항</div>
                    <StyledUl>
                        <li>각 파일의 용량은 500kb 미만만 첨부가 가능합니다</li>
                        <li>
                            청소년 고객은 법정대리인 신분증(앞면)과 가족관계증명서(3개월 이내 발급본)을 스캔하여
                            첨부바랍니다 (첨부가 어려운 경우에는 판매자에게 별도 문의 바랍니다)
                        </li>
                        <li>예금주가 명의자와 다른 경우에는 예금주 신분증도 함께 첨부해 주셔야 합니다</li>
                    </StyledUl>
                    <div style={{ fontSize: "0.8rem" }}>테두리가 보이는 스캔본</div>
                    <img src={idcard_correct} width="100%" alt="신분증 견본 옳은"></img>
                    <div style={{ fontSize: "0.8rem" }}>테두리가 잘린 스캔본 불가</div>
                    <img src={idcard_wrong} width="100%" alt="신분증 견본 잘못된"></img>
                </StyledAlert>
            </Collapse>

            <SubContainer>
                <DocChecker check={applyData.contractCheck} title="약정관련 안내" hadleAgree={agreeWithContract}>
                    <div>
                        1. 최소회선유지기간(186일)이내 일시정지, 명의변경, 기기변경,번호이동은 불가합니다. <br />
                        2. 가입요금제 93일이내변경,무통화,일시정지, 명의변경, 기기변경, 타사 번호이동시 위약금
                        청구됩니다.
                        <br />
                        3. 불법 대포폰 신청및 폰파라치 신고 목적등 (불편법구매) 당사에 과징금 및 손해를 입혔을 시 <br />
                        이에 상응하는 피해금액을 청구합니다.
                        <br />
                        4. 개통후 3개월간 발신통화는 매월 5분이상 발신되어야 합니다. (불편법구매방지목적)
                        <br />
                        <br />
                        본인은 위 내용을 숙지하였으며, 이에 동의합니다.
                    </div>
                </DocChecker>

                <DocChecker
                    check={applyData.privateInfoCheck}
                    title="약관 동의서 및 개인정보 취급방침"
                    hadleAgree={agreeWithPrivateInfo}
                >
                    <div>
                        약관동의서 및 개인정보 취급방침
                        <br />
                        <br />
                        본 신청서에 기재된 본인의 정보 및 서비스 이용과정에서 생성되는 본인의 정보는 , 및 의 규정에 따라
                        휴대폰 개통및 서비스 목적으로 귀사가 수집,
                        <br />
                        이용, 제공 및 취급 위탁을 위해 본인의 동의를 얻거나 본인에게 위 내용을 고지ㆍ공개하여야 하는
                        정보입니다.
                        <br />
                        이에 본인은 귀사의 이동전화 서비스, 부가서비스 및 개인맞춤서비스, 마케팅정보 제공서비스 등을
                        제공받기 위해 다음의 내용을 확인하고, 귀사가 본인의 개인정보ㆍ신용정보를 다음과같이 수집, 이용
                        제공 및 취급위탁하는 것에 동의합니다.
                        <br />
                        <br />
                        *귀사는 개통과 관련되지 않은 마케팅 및 선택적인 동의에 대한 고객정보를 제공하지 않습니다.*
                        <br />
                        *개통후 3개월까지 가입정보는 보관되며, 3개월이후 가입에 관한 내역은 지체없이 파기합니다.*
                        <br />
                        <br />
                        1. 개인정보 수집ㆍ이용동의 및 판매조건 동의
                        <br />
                        <br />
                        (SK텔레콤㈜,KT(주),LG텔레콤(주)귀중),MVNO(알뜰폰)등의 가입통신사에 제공.
                        <br />
                        가. 개인정보의 수집ㆍ이용 목적
                        <br />
                        (1) 서비스 제공 및 본인식별 등 : 이동전화서비스, 멤버쉽 서비스, 부가서비스, 통신과금서비스,
                        제휴서비스, 개인맞춤서비스, 광고서비스, 본인확인서비스 등 제반서비스(이하 ‘서비스’) 제공 및 이와
                        관련된 본인 확인 또는 인증, 결제절차진행(통신과금서비스), 통화품질 조사 등 서비스 품질 확인,
                        정상개통 여부 확인 및 미납 안내 등<br />
                        <br />
                        서비스 제공 관련 연락
                        <br />
                        (2) 서비스 관련 정보 제공 등 : 상품 배송, 고지사항 전달, 본인의사 확인, 서비스 관련 상담·불만
                        처리,
                        <br />
                        서비스 이용관련 혜택·유의사항·편의사항 등 정보 제공, 신규 서비스나 이벤트 관련 정보 및 광고 전송
                        <br />
                        (3) 요금 정산 및 과금 : '서비스' 이용 요금 정산·청구·수납·자동이체·추심, 청구서 송부, 요금 관련
                        <br />
                        상담·불만 처리, 요금관련 혜택·유의사항·편의사항 등 정보 제공, 신규서비스나 이벤트 관련정보 및
                        광고전송
                        <br />
                        (4) 통계분석 : 개인을 식별할 수 없는 인구통계학적 분석자료 또는
                        <br />
                        지역·시장 조사 자료(연령별, 성별, 지역별 통계분석, 시장조사 등) 등 작성, 이용, 제공
                        <br />
                        (5) 개인 맞춤서비스 제공 : 개인정보, 위치정보, 생성정보 및 이를 조합·분석한 정보를 이용한,
                        <br />
                        요금제 등의 상품 및 서비스 개발 / 서비스 가입 신청·이용 중 문의 등 제반 고객 응대 시<br />
                        고객 맞춤 상담 제공 / 개인 맞춤 상품 서비스 혜택 또는 개인 맞춤 광고 제안 및 제공 /<br />
                        악성코드 분석·차단 서비스 제공 / 분실 단말 관리 서비스 제공
                        <br />
                        <br />
                        나. 수집하는 개인정보의 항목
                        <br />
                        (1) 식별정보 : 성명(법인명), 주민(법인)등록번호, 여권번호, 외국인등록번호, 전화번호,
                        주민등록번호 대체수단
                        <br />
                        (2) 연락처정보 : 주소, 전화번호, e-mail 주소
                        <br />
                        (3) 거래정보 : 통신과금서비스 제공에 필요한 거래정보
                        <br />
                        (4) 계좌정보 : 계좌(카드)번호, 예금주명 등<br />
                        (5) 생성정보 : 발·수신번호(통화상대방번호 포함), 통화시각, 사용도수, 서비스이용기록, 접속로그,
                        쿠키,
                        <br />
                        접속 IP 정보(도메인 주소 정보 및 접속 URL 정보 포함), 결제기록, 이용정지기록, 멤버쉽 정보(멤버쉽
                        가입고객에 한함),
                        <br />
                        기타 요금 과금에 필요한 데이터 및 이를 조합하여 생성되는 정보(요약개인정보, 데이터마이닝 분석 및
                        <br />
                        고객세분화 정보, 선호도, 라이프스타일, 사회적관계 추정 정보), Application 사용관련 정보(사용
                        App.정보, 사용량 등)
                        <br />
                        (6) 기타 서비스 제공 관련 필요 정보 : 2.에 따른 개인위치정보, 단말기 정보(모델, IMEI번호, USIM
                        번호(ICCID, IMSI 등),
                        <br />
                        단말기 S/W버전 정보, MAC Address 등), 직업, 국가유공자 증명·복지할인 증명 등 각종 증명,
                        <br />
                        부가서비스·번호이동·할부매매계약 내역, 이동전화 서비스 가입 및 해지일·이동전화 가입 기간 등
                        <br />
                        (5) 생성정보 : 발·수신번호(통화상대방번호 포함), 통화시각, 사용도수, 서비스이용기록, 접속로그,
                        쿠키,
                        <br />
                        접속 IP 정보, 결제기록, 이용정지기록, 멤버쉽 정보(멤버쉽 가입고객에 한함),
                        <br />
                        기타 요금 과금에 필요한 데이터 및 이를 조합하여 생성되는 정보(요약개인정보, 데이터마이닝 분석 및
                        <br />
                        고객세분화 정보, 선호도, 라이프스타일, 사회적관계 추정 정보),
                        <br />
                        Application 사용관련 정보(사용 App.정보, 사용량 등)
                        <br />
                        (6) 기타 서비스 제공 관련 필요 정보 : 2.에 따른 개인위치정보, 단말기 정보(모델, IMEI번호,
                        <br />
                        USIM 번호(ICCID, IMSI 등), 단말기 S/W버전 정보 등), 직업, 국가유공자 증명·복지할인 증명 등<br />
                        각종 증명, 부가서비스·번호이동·할부매매계약 내역, 이동전화 서비스 가입 및 해지일·이동전화 가입
                        기간 등<br />
                        ※ 위 정보는 가입 당시 정보 뿐만 아니라 정보 수정으로 변경된 정보를 포함합니다
                        <br />
                        <br />
                        다. 개인정보의 보유기간
                        <br />
                        개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해
                        <br />
                        개인정보를 지체없이 파기합니다.(최대 보유기간은 3개월로한다)
                        <br />
                        <br />
                        <br />
                        가. 법령에 따로 정하는 경우에는 해당 기간까지 보유
                        <br />
                        나. 요금 관련 분쟁 해결을 위해 해지 후 6개월까지
                        <br />
                        (단, 해지고객이 이용요금을 납부하지 않았거나 요금 관련 분쟁이 계속될 경우에는 해결시까지)
                        <br />
                        <br />
                        2.통신사의 정책변경 및 기기입고 불가등 불가항적인 요소의 정책변경등으로 서비스의 취소 및 판매
                        취소를 할수 있다.
                        <br />
                        <br />
                        <br />
                        - 본 상품의 배송 진행관련 정보를 문자로 구매자에게 통보할수있다
                        <br />
                        - 본 상품의 개통을 한 고객대상 안내 문자 및 마케팅문자를 발송할수있다(단 고객이 원하지않을경우
                        발송을 중단한다.)
                        <br />
                        <br />
                        <br />
                        <br />
                        * 계약의 이행을 위한 개인정보 취급위탁 내역은 <br />
                        통신사 홈페이지(www.sktelecom.com) (http://www.kt.com/main.jsp) (http://www.uplus.co.kr/)의
                        개인정보취급방침에서 모두 공개하고 있습니다.
                        <br />
                        <br />
                        본인은 위 1항,2항의 내용을 숙지하였으며, 이에 동의합니다.
                    </div>
                </DocChecker>
            </SubContainer>

            <MoveSteps movePrev={handleMovePrev} validate={validate} finish={finish}></MoveSteps>
        </Container>
    );
};

export default RecieptInfo;
