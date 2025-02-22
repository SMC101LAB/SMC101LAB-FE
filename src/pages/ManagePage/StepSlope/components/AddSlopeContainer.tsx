import styled from 'styled-components';
import { Slope } from '../../../../apis/slopeMap';
import { useState } from 'react';
const createDefaultSlope = (): Slope => {
  const today = new Date();

  return {
    managementNo: '',
    name: '',
    location: {
      province: '',
      city: '',
      district: '',
      address: '',
      roadAddress: '',
      mountainAddress: '',
      mainLotNumber: '',
      subLotNumber: '',
      coordinates: {
        start: {
          type: '',
          coordinates: [0, 0],
          startLatDegree: 0,
          startLatMinute: 0,
          startLatSecond: 0,
          startLongDegree: 0,
          startLongMinute: 0,
          startLongSecond: 0,
        },
        end: {
          type: '',
          coordinates: [0, 0],
          endLatDegree: 0,
          endLatMinute: 0,
          endLatSecond: 0,
          endLongDegree: 0,
          endLongMinute: 0,
          endLongSecond: 0,
        },
      },
    },
    management: {
      organization: '',
      department: '',
      authority: '',
    },
    inspections: {
      serialNumber: '',
      date: today,
      result: '',
    },
    disaster: {
      serialNumber: '',
      riskDate: today,
      riskLevel: '',
      riskScore: '',
      riskType: '',
    },
    collapseRisk: {
      districtNo: '',
      districtName: '',
      designated: false,
      designationDate: today,
    },
    maintenanceProject: {
      year: '',
      type: '',
    },
    slopeInspectionHistory: {
      historyNumber: '',
      inspectionDate: '',
    },
    createdAt: today,
    _id: '',
  };
};

interface AddSlopeProps {
  onSubmit: (updatedSlope: Slope) => void;
}

const AddSlope = ({ onSubmit }: AddSlopeProps) => {
  const [newSlopeData, setNewSlopeData] = useState<Slope>(createDefaultSlope());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('버튼은 누름');
    onSubmit(newSlopeData);
    //초기화
    // setNewSlopeData(createDefaultSlope());
  };

  return (
    <BaseContainer>
      <Form id="slopeForm" onSubmit={handleSubmit}>
        <ContentContainer>
          <ScrollContainer>
            <Section>
              <SectionTitle>기본 정보</SectionTitle>
              <FormGroup>
                <Label>관리번호</Label>
                <Input
                  type="text"
                  value={newSlopeData.managementNo}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      managementNo: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>급경사지명</Label>
                <Input
                  type="text"
                  value={newSlopeData.name}
                  onChange={(e) =>
                    setNewSlopeData({ ...newSlopeData, name: e.target.value })
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
                  value={newSlopeData.management.organization}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      management: {
                        ...newSlopeData.management,
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
                  value={newSlopeData.management.authority}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      management: {
                        ...newSlopeData.management,
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
                  value={newSlopeData.management.department}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      management: {
                        ...newSlopeData.management,
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
                  value={newSlopeData.location.province}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      location: {
                        ...newSlopeData.location,
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
                  value={newSlopeData.location.city}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      location: {
                        ...newSlopeData.location,
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
                  value={newSlopeData.location.district}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      location: {
                        ...newSlopeData.location,
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
                  value={newSlopeData.location.address}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      location: {
                        ...newSlopeData.location,
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
                  value={newSlopeData.location.roadAddress}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      location: {
                        ...newSlopeData.location,
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
                  value={newSlopeData.location.mountainAddress}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      location: {
                        ...newSlopeData.location,
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
                    value={newSlopeData.location.mainLotNumber}
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
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
                    value={newSlopeData.location.subLotNumber}
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          subLotNumber: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
            </Section>
          </ScrollContainer>
        </ContentContainer>
        <ContentContainer>
          <ScrollContainer>
            <Section>
              <SectionTitle>GIS 정보</SectionTitle>
              <SubSectionTitle>GIS좌표시점</SubSectionTitle>
              <SubSection>
                <FormGroup>
                  <Label>GIS좌표시점위도도</Label>
                  <Input
                    type="text"
                    value={
                      newSlopeData.location.coordinates.start.startLatDegree
                    }
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            start: {
                              ...newSlopeData.location.coordinates.start,
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
                    value={
                      newSlopeData.location.coordinates.start.startLatMinute
                    }
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            start: {
                              ...newSlopeData.location.coordinates.start,
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
                    value={
                      newSlopeData.location.coordinates.start.startLatSecond
                    }
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            start: {
                              ...newSlopeData.location.coordinates.start,
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
                      newSlopeData.location.coordinates.start.startLongDegree
                    }
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            start: {
                              ...newSlopeData.location.coordinates.start,
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
                      newSlopeData.location.coordinates.start.startLongMinute
                    }
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            start: {
                              ...newSlopeData.location.coordinates.start,
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
                      newSlopeData.location.coordinates.start.startLongSecond
                    }
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            start: {
                              ...newSlopeData.location.coordinates.start,
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
                    value={newSlopeData.location.coordinates.end.endLatDegree}
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            end: {
                              ...newSlopeData.location.coordinates.end,
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
                    value={newSlopeData.location.coordinates.end.endLatMinute}
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            end: {
                              ...newSlopeData.location.coordinates.end,
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
                    value={newSlopeData.location.coordinates.end.endLatSecond}
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            end: {
                              ...newSlopeData.location.coordinates.end,
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
                    value={newSlopeData.location.coordinates.end.endLongDegree}
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            end: {
                              ...newSlopeData.location.coordinates.end,
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
                    value={newSlopeData.location.coordinates.end.endLongMinute}
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            end: {
                              ...newSlopeData.location.coordinates.end,
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
                    value={newSlopeData.location.coordinates.end.endLongSecond}
                    onChange={(e) =>
                      setNewSlopeData({
                        ...newSlopeData,
                        location: {
                          ...newSlopeData.location,
                          coordinates: {
                            ...newSlopeData.location.coordinates,
                            end: {
                              ...newSlopeData.location.coordinates.end,
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
                <Label>안전점검일련번호</Label>
                <Input
                  type="text"
                  value={newSlopeData.inspections.serialNumber}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      inspections: {
                        ...newSlopeData.inspections,
                        serialNumber: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>안전점검일자</Label>
                <Input
                  type="date"
                  value={
                    newSlopeData.inspections.date
                      ? new Date(newSlopeData.inspections.date)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      inspections: {
                        ...newSlopeData.inspections,
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
                  value={newSlopeData.inspections.result}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      inspections: {
                        ...newSlopeData.inspections,
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
                  value={newSlopeData.disaster.serialNumber}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      disaster: {
                        ...newSlopeData.disaster,
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
                    newSlopeData.disaster.riskDate
                      ? new Date(newSlopeData.disaster.riskDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      disaster: {
                        ...newSlopeData.disaster,
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
                  value={newSlopeData.disaster.riskLevel}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      disaster: {
                        ...newSlopeData.disaster,
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
                  value={newSlopeData.disaster.riskScore}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      disaster: {
                        ...newSlopeData.disaster,
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
                  value={newSlopeData.disaster.riskType}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      disaster: {
                        ...newSlopeData.disaster,
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
                  value={newSlopeData.collapseRisk.districtNo}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      collapseRisk: {
                        ...newSlopeData.collapseRisk,
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
                  value={newSlopeData.collapseRisk.districtName}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      collapseRisk: {
                        ...newSlopeData.collapseRisk,
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
                  checked={newSlopeData.collapseRisk.designated}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      collapseRisk: {
                        ...newSlopeData.collapseRisk,
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
                    newSlopeData.collapseRisk.designationDate
                      ? new Date(newSlopeData.collapseRisk.designationDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      collapseRisk: {
                        ...newSlopeData.collapseRisk,
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
                  value={newSlopeData.maintenanceProject?.type || ''}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      maintenanceProject: {
                        ...newSlopeData.maintenanceProject,
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
                  value={newSlopeData.maintenanceProject?.year || ''}
                  onChange={(e) =>
                    setNewSlopeData({
                      ...newSlopeData,
                      maintenanceProject: {
                        ...newSlopeData.maintenanceProject,
                        year: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>
          </ScrollContainer>
        </ContentContainer>
      </Form>
      <ButtonGroup>
        <SubmitButton type="submit" form="slopeForm">
          추가하기
        </SubmitButton>
      </ButtonGroup>
    </BaseContainer>
  );
};
export default AddSlope;

const BaseContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85%;
`;

const ContentContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex: 1;
  overflow-y: auto;
  position: relative;
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
  top: -90px;
  right: 0;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
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

const SubSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
`;
