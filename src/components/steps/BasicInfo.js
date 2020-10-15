import React from "react";
import { callplanOptions, hpcolorOptions } from "../../utils/constants";
import InfoItem from "../InfoItem";
import SelectControl from "../SelectControl";
import DocChecker from "../DocChecker";
import MoveSteps from "../MoveSteps";

const BasicInfo = ({ applyData, setApplyData, moveNext, showAlert }) => {
    const agreeWithDoc = () => {
        setApplyData({ ...applyData, conditionCheck: true });
    };
    const validate = () => {
        if (!applyData.conditionCheck) {
            showAlert("판매조건 안내사항에 동의해 주시기 바랍니다");
            return false;
        }
        return true;
    };
    const applyOf = (key) => (x) => setApplyData({ ...applyData, [key]: x });

    return (
        <>
            <InfoItem label="신청상품" value="U+알뜰모바일 선불유심"></InfoItem>
            <InfoItem label="가입구분" value="신규가입"></InfoItem>
            <InfoItem label="약정기간" value="1개월"></InfoItem>
            <InfoItem label="출고가/할부원금" value="0원 / 0원"></InfoItem>
            <InfoItem label="가입비/유심비" value="0원(면제) / 0원(면제)"></InfoItem>
            <InfoItem label="보조금" value="개통시 첫달 기본료전액 무료충전"></InfoItem>

            <SelectControl
                name="callplan"
                label="요금제*"
                options={callplanOptions}
                value={applyData.callplan}
                onChange={applyOf("callplan")}
            ></SelectControl>

            <SelectControl
                name="hpcolor"
                label="옵션*"
                options={hpcolorOptions}
                value={applyData.hpcolor}
                onChange={applyOf("hpcolor")}
            ></SelectControl>

            <DocChecker check={applyData.conditionCheck} title="판매조건 안내사항" hadleAgree={agreeWithDoc}>
                <p>
                    <b>※ 개통 전 주의사항 ※</b>
                </p>
                <p>스팸 문자 발송은 한국 방송통신 진흥협회로부터 자동으로 필터링 됩니다.</p>
                <p>스팸 문자(도박/대출/성인광고/보이스피싱) 발송 시 SK, KT, LG 가입회선 전체에 대하여 정지되며 </p>
                <p>앞으로의 휴대폰 가입이 일체 거절 될 수 있음을 알립니다.</p>
                <p></p>
                <p>또한 명의도용의 목적으로 가입 시 민/형사상 책임을 물을 수 있습니다.</p>
                <p></p>
                <br />
                <p>
                    <b>※ 가입 조건 안내 ※</b>
                </p>
                <p></p>
                <p>● 신용불량 / 체납 / 할부불가 / 연체폰 모두 본인명의로 개통 가능합니다.</p>
                <p>● 분실폰에서는 사용할 수 없습니다.</p>
                <p>● 명의 당 1회선만 사용 가능합니다.</p>
                <p>● 1+2 개통 시 1달 요금으로 총 3월(90일) 사용 가능합니다.</p>
                <p>● 구비서류 첨부 시 신분증/운전면허증/복지카드/임시발급증/여권 모두 첨부 가능합니다.</p>
                <p></p>
                <p>★ 본인인증/폰뱅킹/공인인증서/카카오뱅크 인증 가능</p>
                <p>★ 소액결제 및 컬러링불가 / 042-114 등 정보이용료 발생 통화는 추가요금 발생</p>
                <p>★ 영상통화/대표번호 통화 요금제에 따라 50분/300분 제공 (구매 상세페이지 참고)</p>
                <p></p>
                <p></p>
                <br />
                <p>
                    <b>※ 사용 가능 휴대폰 ※</b>
                </p>
                <p></p>
                <p>2014.07 출시 이후 SK, KT, LG 전 모델 사용 가능 (갤러시 노트5 이상 모두 사용 가능)</p>
                <p>2014.07 출시 이전 모델은 LG U+ 단말기만 사용 가능</p>
                <p>아이폰 전 모델 사용 가능</p>
                <p>외산폰 - 화웨이, OPPO 등 사용 불가</p>
                <p></p>
                <p></p>
                <br />
                <p>
                    <b>※ 구비서류 안내 ※</b>
                </p>
                <p></p>
                <p>신청서 작성 후 필요서류는 신청서에 첨부파일로 보내주시거나,</p>
                <p>신청서 작성 후 휴대폰에서 아래 메일로 보내주셔도 됩니다.</p>
                <p></p>
                <p></p>
                <p>고객센터 : 042-672-4560 (내선 1번)</p>
                <p></p>
                <p>E-mail : innhh@naver.com </p>
                <p></p>
            </DocChecker>

            <MoveSteps moveNext={moveNext} validate={validate}></MoveSteps>
        </>
    );
};

export default BasicInfo;
