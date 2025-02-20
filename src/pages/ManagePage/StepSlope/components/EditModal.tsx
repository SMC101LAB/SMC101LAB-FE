import styled from 'styled-components';
import { Slope } from '../../../../apis/slopeMap';
import { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedSlope: Slope) => void;
  selectedRow: Slope | null;
}

const EditModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedRow,
}: EditModalProps) => {
  const [editedData, setEditedData] = useState<Slope | null>(null);

  useEffect(() => {
    if (selectedRow) {
      setEditedData(selectedRow);
    }
  }, [selectedRow]);

  if (!editedData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedData) {
      onSubmit(editedData);
    }
    onClose();
  };

  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <h2>급경사지 정보 수정</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ScrollContainer>
            <Section>
              <SectionTitle>기본 정보</SectionTitle>
              <FormGroup>
                <Label>관리번호</Label>
                <Input
                  type="text"
                  value={editedData.managementNo}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      managementNo: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>급경사지명</Label>
                <Input
                  type="text"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                />
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>관리 정보</SectionTitle>
              <FormGroup>
                <Label>시행청명</Label>
                <Input
                  type="text"
                  value={editedData.management.organization}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      management: {
                        ...editedData.management,
                        organization: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>관리주체구분코드</Label>
                <Input
                  type="text"
                  value={editedData.management.authority}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      management: {
                        ...editedData.management,
                        authority: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>소관부서명</Label>
                <Input
                  type="text"
                  value={editedData.management.department}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      management: {
                        ...editedData.management,
                        department: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>위치 정보</SectionTitle>
              <FormGroup>
                <Label>시도</Label>
                <Input
                  type="text"
                  value={editedData.location.province}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      location: {
                        ...editedData.location,
                        province: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>시군구</Label>
                <Input
                  type="text"
                  value={editedData.location.city}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      location: {
                        ...editedData.location,
                        city: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>읍면동</Label>
                <Input
                  type="text"
                  value={editedData.location.district}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      location: {
                        ...editedData.location,
                        district: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>상세주소</Label>
                <Input
                  type="text"
                  value={editedData.location.address}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      location: {
                        ...editedData.location,
                        address: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>도로명상세주소</Label>
                <Input
                  type="text"
                  value={editedData.location.roadAddress}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      location: {
                        ...editedData.location,
                        roadAddress: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>산주소여부</Label>
                <Input
                  type="text"
                  value={editedData.location.mountainAddress}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      location: {
                        ...editedData.location,
                        mountainAddress: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <SubSection>
                <FormGroup>
                  <Label>주지번</Label>
                  <Input
                    type="text"
                    value={editedData.location.mainLotNumber}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          mainLotNumber: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>부지번</Label>
                  <Input
                    type="text"
                    value={editedData.location.subLotNumber}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          subLotNumber: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
            </Section>
            <Section>
              <SectionTitle>GIS 정보</SectionTitle>
              <SubSectionTitle>GIS좌표시점</SubSectionTitle>
              <SubSection>
                <FormGroup>
                  <Label>GIS좌표시점위도도</Label>
                  <Input
                    type="text"
                    value={editedData.location.coordinates.start.startLatDegree}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            start: {
                              ...editedData.location.coordinates.start,
                              startLatDegree: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표시점위도시</Label>
                  <Input
                    type="text"
                    value={editedData.location.coordinates.start.startLatMinute}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            start: {
                              ...editedData.location.coordinates.start,
                              startLatMinute: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표시점위도초</Label>
                  <Input
                    type="text"
                    value={editedData.location.coordinates.start.startLatSecond}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            start: {
                              ...editedData.location.coordinates.start,
                              startLatSecond: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
              <SubSection>
                <FormGroup>
                  <Label>GIS좌표시점경도도</Label>
                  <Input
                    type="text"
                    value={
                      editedData.location.coordinates.start.startLongDegree
                    }
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            start: {
                              ...editedData.location.coordinates.start,
                              startLongDegree: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표시점경도시</Label>
                  <Input
                    type="text"
                    value={
                      editedData.location.coordinates.start.startLongMinute
                    }
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            start: {
                              ...editedData.location.coordinates.start,
                              startLongMinute: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표시점경도초</Label>
                  <Input
                    type="text"
                    value={
                      editedData.location.coordinates.start.startLongSecond
                    }
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            start: {
                              ...editedData.location.coordinates.start,
                              startLongSecond: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
              <SubSectionTitle>GIS좌표종점</SubSectionTitle>
              <SubSection>
                <FormGroup>
                  <Label>GIS좌표종점위도도</Label>
                  <Input
                    type="text"
                    value={editedData.location.coordinates.end.endLatDegree}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            end: {
                              ...editedData.location.coordinates.end,
                              endLatDegree: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표종점위도시</Label>
                  <Input
                    type="text"
                    value={editedData.location.coordinates.end.endLatMinute}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            end: {
                              ...editedData.location.coordinates.end,
                              endLatMinute: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표종점위도초</Label>
                  <Input
                    type="text"
                    value={editedData.location.coordinates.end.endLatSecond}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            end: {
                              ...editedData.location.coordinates.end,
                              endLatSecond: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
              <SubSection>
                <FormGroup>
                  <Label>GIS좌표종점경도도</Label>
                  <Input
                    type="text"
                    value={editedData.location.coordinates.end.endLongDegree}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            end: {
                              ...editedData.location.coordinates.end,
                              endLongDegree: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표종점경도시</Label>
                  <Input
                    type="text"
                    value={editedData.location.coordinates.end.endLongMinute}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            end: {
                              ...editedData.location.coordinates.end,
                              endLongMinute: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표종점경도초</Label>
                  <Input
                    type="text"
                    value={editedData.location.coordinates.end.endLongSecond}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        location: {
                          ...editedData.location,
                          coordinates: {
                            ...editedData.location.coordinates,
                            end: {
                              ...editedData.location.coordinates.end,
                              endLongSecond: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
            </Section>
            <Section>
              <SectionTitle>안전</SectionTitle>
              <FormGroup>
                <Label>안전점검일자</Label>
                <Input
                  type="date"
                  value={
                    editedData.disaster.riskDate
                      ? new Date(editedData.disaster.riskDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      inspections: {
                        ...editedData.inspections,
                        date: new Date(e.target.value),
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>안전점검결과코드</Label>
                <Input
                  type="text"
                  value={editedData.inspections.result}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      inspections: {
                        ...editedData.inspections,
                        result: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>
            <Section>
              <SectionTitle>재해위험도</SectionTitle>
              <FormGroup>
                <Label>재해위험도평가일련번호</Label>
                <Input
                  type="text"
                  value={editedData.disaster.serialNumber}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      disaster: {
                        ...editedData.disaster,
                        serialNumber: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>재해위험도평가일자</Label>
                <Input
                  type="date"
                  value={
                    editedData.disaster.riskDate
                      ? new Date(editedData.disaster.riskDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      disaster: {
                        ...editedData.disaster,
                        riskDate: new Date(e.target.value),
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>재해위험도평가등급코드</Label>
                <Input
                  type="text"
                  value={editedData.disaster.riskLevel}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      disaster: {
                        ...editedData.disaster,
                        riskLevel: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>재해위험도평가점수합계</Label>
                <Input
                  type="text"
                  value={editedData.disaster.riskScore}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      disaster: {
                        ...editedData.disaster,
                        riskScore: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>재해위험도평가종류코드</Label>
                <Input
                  type="text"
                  value={editedData.disaster.riskType}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      disaster: {
                        ...editedData.disaster,
                        riskType: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>
            <Section>
              <SectionTitle>붕괴위험지구</SectionTitle>
              <FormGroup>
                <Label>붕괴위험지구번호</Label>
                <Input
                  type="text"
                  value={editedData.collapseRisk.districtNo}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      collapseRisk: {
                        ...editedData.collapseRisk,
                        districtNo: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>붕괴위험지구명</Label>
                <Input
                  type="text"
                  value={editedData.collapseRisk.districtName}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      collapseRisk: {
                        ...editedData.collapseRisk,
                        districtName: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>붕괴위험지구지정여부</Label>
                <Input
                  type="checkbox"
                  checked={editedData.collapseRisk.designated}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      collapseRisk: {
                        ...editedData.collapseRisk,
                        designated: e.target.checked,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>붕괴위험지구지정일자</Label>
                <Input
                  type="date"
                  value={
                    editedData.collapseRisk.designationDate
                      ? new Date(editedData.collapseRisk.designationDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      collapseRisk: {
                        ...editedData.collapseRisk,
                        designationDate: new Date(e.target.value),
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>
            <Section>
              <SectionTitle>정비사업</SectionTitle>
              <FormGroup>
                <Label>정비사업유형코드</Label>
                <Input
                  type="text"
                  value={editedData.maintenanceProject?.type || ''}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      maintenanceProject: {
                        ...editedData.maintenanceProject,
                        type: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>정비사업유형년도</Label>
                <Input
                  type="text"
                  value={editedData.maintenanceProject?.year || ''}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      maintenanceProject: {
                        ...editedData.maintenanceProject,
                        year: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>
          </ScrollContainer>

          <ButtonGroup>
            <SubmitButton type="submit">저장</SubmitButton>
            <CancelButton type="button" onClick={onClose}>
              취소
            </CancelButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};

  h2 {
    margin: 0;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.grey[900]};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const Section = styled.div`
  margin-bottom: 12px;
  padding-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[400]};
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey[900]};
  margin: 0 0 16px 0;
`;
const SubSectionTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey[900]};
  margin: 20px 0 16px 0;
  font-weight: bold;
`;
const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #24478f;
    box-shadow: 0 0 0 2px rgba(36, 71, 143, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const SubmitButton = styled(Button)`
  background: #24478f;
  color: white;
  border: none;

  &:hover {
    opacity: 0.9;
  }
`;

const CancelButton = styled(Button)`
  background: white;
  color: ${({ theme }) => theme.colors.grey[700]};
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};

  &:hover {
    background: ${({ theme }) => theme.colors.grey[50]};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.colors.grey[500]};

  &:hover {
    color: ${({ theme }) => theme.colors.grey[700]};
  }
`;

const SubSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
`;
export default EditModal;
