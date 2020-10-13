import React, { useEffect } from "react";
import $ from "jquery";
import { Collapse } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";
import SelectControl from "../SelectControl";
import { paper_methodOptions } from "../../utils/constants";
import MoveSteps from "../MoveSteps";

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

const StyledAlert = styled(Alert)`
    margin-top: 1rem;
`;

const RecieptInfo = ({ applyData, setApplyData, movePrev, moveNext, showAlert, onChangeFile }) => {
    const validate = () => {
        const file0 = $("#file0")[0].files[0] || { size: 0 };
        const file1 = $("#file1")[0].files[0] || { size: 0 };
        const file2 = $("#file2")[0].files[0] || { size: 0 };

        if (file0.size + file1.size + file2.size >= 2097152) {
            showAlert("첨부파일이 총 2MB이상입니다. 다시 첨부해 주시기 바랍니다");
            return false;
        }

        return true;
    };
    const applyOf = (key) => (x) => setApplyData({ ...applyData, [key]: x });
    const handleChangeFile = (index) => (e) => onChangeFile(index, e);
    
    useEffect(() => {
        const $files = $("#files");
        $files.empty();

        const $file0 = $("#b_file0").clone();
        $file0.attr("id", "file0");
        $file0.change(handleChangeFile(0));
        $files.append($file0);

        const $file1 = $("#b_file1").clone();
        $file1.attr("id", "file1");
        $file1.change(handleChangeFile(1));
        $files.append($file1);

        const $file2 = $("#b_file2").clone();
        $file2.attr("id", "file2");
        $file2.change(handleChangeFile(2));
        $files.append($file2);
    }, []);

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
                <div id="files"></div>

                <StyledAlert severity="warning">
                    <div>구비서류 등록시 주의사항</div>
                    <StyledUl>
                        <li>첨부한 총 파일의 용량은 2MB 미만이어야 합니다</li>
                        <li>
                            청소년 고객은 법정대리인 신분증(앞면)과 가족관계증명서(3개월 이내 발급본)을 사진 또는
                            스캔하여 첨부바랍니다 (첨부가 어려운 경우에는 판매자에게 별도 문의 바랍니다)
                        </li>
                        <li>예금주가 명의자와 다른 경우에는 예금주 신분증도 함께 첨부해 주셔야 합니다</li>
                    </StyledUl>
                    <div style={{ fontSize: "0.8rem" }}>테두리가 보이는 사진 또는 스캔본</div>
                    <img src={idcard_correct} width="100%" alt="신분증 견본 옳은"></img>
                    <div style={{ fontSize: "0.8rem" }}>테두리가 잘린 사진 또는 스캔본 불가</div>
                    <img src={idcard_wrong} width="100%" alt="신분증 견본 잘못된"></img>
                </StyledAlert>
            </Collapse>

            <MoveSteps movePrev={movePrev} moveNext={moveNext} validate={validate}></MoveSteps>
        </Container>
    );
};

export default RecieptInfo;
