import React from "react";
import $ from "jquery";
import { Collapse, Button, IconButton, Icon } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";
import Compressor from "compressorjs";
import palette from "../../utils/palette";
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

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 0.5rem;
`;

const Volumes = styled.div`
    font-size: 0.8rem;
    color: ${palette.gray};
`;

const FileContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`;

const FileContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
`;

const FileName = styled.div`
    display: flex;
    align-items: center;
    width: 70%;

    & .b_filename {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 0.2rem;
    }
`;

const FileSize = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 30%;
`;

const RecieptInfo = ({ applyData, setApplyData, movePrev, moveNext, showAlert, setBackDropOpen }) => {
    const applyOf = (key) => (x) => setApplyData({ ...applyData, [key]: x });
    const handleClick = (e) => {
        let index = null;
        for (let i = 0; i < 5; i++) {
            if (!applyData.b_files.some((x) => x.index === i)) {
                index = i;
                break;
            }
        }

        let $file = $("<input/>", { type: "file" });
        $file.on("change", function (e) {
            if (!e.target.files || !e.target.files[0]) {
                $file.remove();
                return;
            }

            if (e.target.files[0].type.startsWith("image")) {
                setBackDropOpen(true);
                new Compressor(e.target.files[0], {
                    maxWidth: 800,
                    maxHeight: 800,
                    quality: 0.6,
                    success(result) {
                        _append(result);
                        setBackDropOpen(false);
                        $file.remove();
                    },
                    error(err) {
                        window.alert("다시 시도해 주세요");
                        setBackDropOpen(false);
                        $file.remove();
                    },
                });
            } else {
                _append(e.target.files[0]);
                $file.remove();
            }

            function _append(file) {
                const size = applyData.b_files.reduce((sum, b_file) => (sum += b_file.file.size), 0) + file.size;
                if (size >= 2097152) {
                    showAlert("첨부파일이 총 2MB이상입니다. 다시 첨부해 주시기 바랍니다");
                    return;
                }

                const b_files = [...applyData.b_files];
                b_files.push({
                    index: index,
                    file: file,
                });
                setApplyData({ ...applyData, b_files });
            }
        });
        $file.trigger("click");
    };

    const handleRemoveFile = (index, e) => {
        const b_files = [...applyData.b_files];
        const idx = b_files.findIndex((x) => x.index === index);
        if (idx > -1) {
            b_files.splice(idx, 1);
            setApplyData({ ...applyData, b_files });
        }
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
                <SubContainer>
                    <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        onClick={handleClick}
                        disabled={applyData.b_files.length > 4}
                        size="small"
                    >
                        첨부하기({applyData.b_files.length}/5)
                    </Button>
                    <Volumes>
                        {(
                            applyData.b_files.reduce((sum, b_file) => (sum += b_file.file.size), 0) /
                            1024 /
                            1024
                        ).toFixed(1)}
                        Mb / 2Mb
                    </Volumes>
                </SubContainer>

                <FileContainer>
                    {applyData.b_files.map((b_file) => {
                        return (
                            <FileContent key={b_file.index}>
                                <FileName>
                                    <Icon size="small" color="error">
                                        description
                                    </Icon>
                                    <div class="b_filename">{b_file.file.name}</div>
                                </FileName>
                                <FileSize>
                                    {(b_file.file.size / 1024).toFixed(0) > 999
                                        ? `${(b_file.file.size / 1024 / 1024).toFixed(1)}Mb`
                                        : `${(b_file.file.size / 1024).toFixed(0)}kb`}
                                    <IconButton onClick={handleRemoveFile.bind(this, b_file.index)} size="small">
                                        <Icon>close</Icon>
                                    </IconButton>
                                </FileSize>
                            </FileContent>
                        );
                    })}
                </FileContainer>

                <StyledAlert severity="warning">
                    <div>구비서류 등록시 주의사항</div>
                    <StyledUl>
                        <li>2MB 이상은 첨부할 수 없습니다</li>
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

            <MoveSteps movePrev={movePrev} moveNext={moveNext}></MoveSteps>
        </Container>
    );
};

export default RecieptInfo;
